import { withAuthenticator } from "aws-amplify-react";
import React from "react";
import Amplify, { API, Auth } from "aws-amplify";
import awsconfig from "./aws-exports";
import Tabs, { TabPane } from "rc-tabs";
import TabContent from "rc-tabs/lib/TabContent";
import ScrollableInkTabBar from "rc-tabs/lib/ScrollableInkTabBar";
import "rc-tabs/assets/index.css";
import styles from "./app.css";
import AWSAppSyncClient from "aws-appsync";
import { Rehydrated } from 'aws-appsync-react';
import { ApolloProvider } from 'react-apollo';
import AllProfiles from "./components/AllProfiles";
import CreateProfile from "./components/CreateProfile";

Auth.configure(awsconfig);
Amplify.configure(awsconfig);

const GRAPHQL_API_REGION = awsconfig.aws_appsync_region
const GRAPHQL_API_ENDPOINT_URL = awsconfig.aws_appsync_graphqlEndpoint
const AUTH_TYPE = awsconfig.aws_appsync_authenticationType

const defaultTabKey = "1";

// AppSync client instantiation
const client = new AWSAppSyncClient({
  url: GRAPHQL_API_ENDPOINT_URL,
  region: GRAPHQL_API_REGION,
  auth: {
    type: AUTH_TYPE,
    // Get the currently logged in users credential.
    jwtToken: async () => (await Auth.currentSession()).getAccessToken().getJwtToken(),
  },
  // Amplify uses Amazon IAM to authorize calls to Amazon S3. This provides the relevant IAM credentials.
  complexObjectsCredentials: () => Auth.currentCredentials()
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabKey: defaultTabKey,
    };
    this.onTabClick = this.onTabClick.bind(this);
  }

  updateInputValue(evt) {
    var value = evt.target.value;
    // for checkbox get .checked instead of value
    if (evt.target.type == "checkbox") {
      value = evt.target.checked;
    } else if (evt.target.type == "file") {
      value = evt.target.files[0];
    }
    this.setState({
      [event.target.name]: value
    });
  }

  async postData(data, callback, headers = {}) {
    let apiName = data.apiName;
    let path = "/" + data.apiPath;
    let myInit = {
      body: data.body
    };
    return await API.post(apiName, path, myInit)
      .then(callback)
      .catch(error => {
        console.log(error.response);
      });
  }

  async postDataWithFile(data, callback, headers) {
    let apiName = data.apiName;
    let path = "/" + data.apiPath;
    let myInit = {
      body: data.body,
      headers: headers
    };
    return await API.post(apiName, path, myInit)
      .then(callback)
      .catch(error => {
        console.log(error.response);
      });
  }

  // signout then refresh to display the login page again
  handleSignout() {
    console.log("signing out");
    Auth.signOut()
      .then(data => console.log(data))
      .then(() => window.location.reload())
      .catch(err => console.log(err));
  }

  onChange(key) {
    console.log("onChange", key);
  }

  onTabClick(key) {
    console.log("onTabClick", key);
  }

  render() {
    return (
      <div className={styles.container}>
        <div
          id="prepareDataSection"
        >
          <div className={styles.sectionHeader}>
            Hi <b>{this.state.userName} </b> {}
            <a onClick={this.handleSignout} className={styles.a}>
              Signout
            </a>
          </div>
          <div className={styles.formSection}>
            <Tabs
              defaultActiveKey={defaultTabKey}
              renderTabBar={() => (
                <ScrollableInkTabBar onTabClick={this.onTabClick} />
              )}
              onChange={this.onChange}
              renderTabContent={() => <TabContent />}
            >
              <TabPane tab="Configure" key="1">
                <div className="App-content">
                  <CreateProfile />
                  <AllProfiles />
                </div>
              </TabPane>
              <TabPane tab="View News" key="2">
                <div className="App-content">
                  <AllProfiles />
                </div>  
              </TabPane>
            </Tabs>
          </div>
        </div>
      </div>
    );
  }
}

const AppWithAuth = withAuthenticator(App, true);

export default () => (
  <ApolloProvider client={client}>
    <Rehydrated>
      <AppWithAuth />
    </Rehydrated>
  </ApolloProvider>
);
