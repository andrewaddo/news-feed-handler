import React from "react";
import DeleteProfile from "./deleteProfile";
import EditProfile from "./editProfile";
import styles from "../app.css";
import { API } from "aws-amplify";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedProfileID: "",
    };
    this.onProfileSelect = this.onProfileSelect.bind(this);
    this.testProfileResult = this.testProfileResult.bind(this);
    this.testProfile = this.testProfile(this);
  }

  async postData(data, callback, headers = {}) {
    let apiName = data.apiName;
    let path = "/" + data.apiPath;
    let myInit = {
      body: data.body,
    };
    return await API.post(apiName, path, myInit)
      .then(callback)
      .catch((error) => {
        console.log(error.response);
      });
  }

  testProfile(profileID) {
    console.log("testing profile", profileID);
    var data = {};
    data.apiName = "profile/" + profileID;
    data.apiPath = "test";
    data.body = {};
    this.postData(data, this.testProfileResult);
  }

  testProfileResult(result) {
    console.log("testing profile DONE");
  }

  componentDidMount() {
    this.props.subscribeToMore();
  }

  onProfileSelect(event) {
    let selectedProfileID = event.target.value;
    this.setState({ selectedProfileID: selectedProfileID });
    this.props.onProfileSelect(event.target.value);
  }

  render() {
    const items = this.props.data.listProfileConfigs.items;

    return (
      <div className={styles.divTable}>
        {items.map((profile) => {
          return (
            <div className={styles.divTableRow} key={profile.id}>
              <div className={styles.divTableCol}>
                <input
                  type="radio"
                  value={profile.id}
                  checked={this.state.selectedProfileID === profile.id}
                  onChange={this.onProfileSelect}
                />
              </div>
              <div className={styles.divTableCol}>{profile.profile}</div>
              <div className={styles.divTableCol + " " + styles.wordwrap}>
                {profile.webhookURL}
              </div>
              <div>
                <button onClick={() => this.testProfile(profile.id)}>
                  Test Profile
                </button>
              </div>
              <div className={styles.divTableCol}>
                <DeleteProfile {...profile} />
              </div>
              <div className={styles.divTableCol}>
                <EditProfile {...profile} />
              </div>
              <br />
            </div>
          );
        })}
      </div>
    );
  }
}

export default Profile;
