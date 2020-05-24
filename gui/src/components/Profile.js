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
      testBackDay: 3,
    };
    this.onProfileSelect = this.onProfileSelect.bind(this);
    this.testProfileResult = this.testProfileResult.bind(this);
    this.testProfile = this.testProfile.bind(this);
    this.handleTestBackDate = this.handleTestBackDate.bind(this);
  }

  async postData(data, callback, headers = {}) {
    console.log("posting data", data);
    let apiName = data.apiName;
    let path = "/" + data.apiPath;
    let myInit = {
      headers: {
        // just these 2, no extra non-sense which will messes CORS up
        // OPTIONS returns whatever provided here
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: data.body,
    };
    console.log("posting", apiName, path, myInit);
    return await API.post(apiName, path, myInit).then(callback);
    // .catch((error) => {
    //   console.log(error.response);
    // });
  }

  testProfile(profileID) {
    console.log("testing profile", profileID);
    var data = {};
    data.apiName = "nfhrest";
    data.apiPath = "profile/" + profileID + "/test";
    data.body = {
      testBackDay: this.state.testBackDay,
    };
    this.postData(data, this.testProfileResult);
  }

  testProfileResult(result) {
    console.log("testing profile DONE");
    alert("testing profile DONE");
  }

  handleTestBackDate(e) {
    this.setState({
      testBackDay: parseInt(e.target.value, 10),
    });
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
      <table>
        <tbody>
          <tr>
            <th>Select</th>
            <th>Profile</th>
            <th>WebhookURL</th>
            <th style={{ width: "120px" }}>Backdated Test</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
          {items.map((profile) => {
            return (
              <tr key={profile.id}>
                <td>
                  <input
                    type="radio"
                    value={profile.id}
                    checked={this.state.selectedProfileID === profile.id}
                    onChange={this.onProfileSelect}
                  />
                </td>
                <td>{profile.profile}</td>
                <td>{profile.webhookURL}</td>
                <td>
                  <input
                    style={{ width: "50px" }}
                    type="text"
                    placeholder="#backdate"
                    required
                    value={this.state.testBackDay}
                    onChange={this.handleTestBackDate}
                  />
                  <button
                    onClick={(e) => {
                      if (
                        window.confirm(
                          "Are you sure you wish to test this item?"
                        )
                      )
                        this.testProfile(profile.id);
                    }}
                  >
                    Test
                  </button>
                </td>
                <td>
                  <DeleteProfile {...profile} />
                </td>
                <td>
                  <EditProfile {...profile} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

export default Profile;
