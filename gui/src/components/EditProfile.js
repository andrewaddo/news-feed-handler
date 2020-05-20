import React from "react";
import { updateProfileConfig as updateProfile } from "../graphql/mutations";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import styles from "../app.css";

class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      profileData: {
        profile: this.props.profile,
        webhookURL: this.props.webhookURL,
      },
    };
    this.handleModal = this.handleModal.bind(this);
    this.handleProfile = this.handleProfile.bind(this);
    this.handleWebhookURL = this.handleWebhookURL.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleModal() {
    this.setState({ show: !this.state.show });
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  handleSubmit(e, updateProfile) {
    e.preventDefault();
    updateProfile({
      variables: {
        input: {
          id: this.props.id,
          profile: this.state.profileData.profile,
          webhookURL: this.state.profileData.webhookURL,
        },
      },
    }).then((res) => this.handleModal());
  }

  handleProfile(e) {
    this.setState({
      profileData: { ...this.state.profileData, profile: e.target.value },
    });
  }

  handleWebhookURL(e) {
    this.setState({
      profileData: { ...this.state.profileData, webhookURL: e.target.value },
    });
  }

  render() {
    return (
      <div>
        {this.state.show && (
          <div className="modal">
            <button className="close" onClick={this.handleModal}>
              X
            </button>
            <Mutation mutation={gql(updateProfile)}>
              {(updateProfile) => {
                return (
                  <form
                    className="add-post"
                    onSubmit={(e) => this.handleSubmit(e, updateProfile)}
                  >
                    <input
                      type="text"
                      required
                      value={this.state.profileData.profile}
                      onChange={this.handleProfile}
                    />
                    <input
                      type="text"
                      require
                      className={styles.wordwrap}
                      value={this.state.profileData.webhookURL}
                      onChange={this.handleWebhookURL}
                    />
                    <button>Update Profile</button>
                  </form>
                );
              }}
            </Mutation>
          </div>
        )}
        <button onClick={this.handleModal}>Edit</button>
      </div>
    );
  }
}

export default EditProfile;
