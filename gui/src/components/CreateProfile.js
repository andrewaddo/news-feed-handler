import React from "react";
import { Mutation } from "react-apollo";
import { createProfileConfig } from "../graphql/mutations";
import gql from "graphql-tag";
import styles from "../app.css";

class CreateProfile extends React.Component {
  handleSubmit(e, createProfileConfig) {
    e.preventDefault();
    createProfileConfig({
      variables: {
        input: {
          profile: this.profile.value,
          webhookURL: this.webhookURL.value,
          userID: this.props.userID
        },
      },
    }).then((res) => {
      this.profile.value = "";
      this.webhookURL.value = "";
    });
  }

  render() {
    return (
      <div>
        <h1>Create Profile</h1>

        <Mutation mutation={gql(createProfileConfig)}>
          {(createProfileConfig, { data, loading, error }) => {
            return (
              <div>
                <form
                  className="add-post"
                  onSubmit={(e) => this.handleSubmit(e, createProfileConfig)}
                >
                  <input
                    className={styles.input}
                    type="text"
                    placeholder="Profile"
                    ref={(node) => (this.profile = node)}
                    required
                  />
                  <input
                    className={styles.input}
                    type="text"
                    width="300px"
                    placeholder="WebhookURL"
                    ref={(node) => (this.webhookURL = node)}
                    required
                  />
                  <button>{loading ? "Yes boss..." : "Create Profile"}</button>
                </form>
                {error && <p>{error.message}</p>}
              </div>
            );
          }}
        </Mutation>
      </div>
    );
  }
}

export default CreateProfile;
