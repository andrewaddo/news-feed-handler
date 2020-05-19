import React from "react";
import { Mutation } from "react-apollo";
import { createProfileConfig } from "../graphql/mutations";
import gql from "graphql-tag";

class CreateProfile extends React.Component {
  handleSubmit(e, createProfileConfig){
    e.preventDefault();
    createProfileConfig({
      variables: {
        input: {
          profile: this.profile.value,
          webhookURL: this.webhookURL.value,
        },
      },
    }).then((res) => {
      this.profile.value = "";
      this.webhookURL.value = "";
    });
  };

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
                    type="text"
                    placeholder="Profile"
                    ref={(node) => (this.profile = node)}
                    required
                  />
                  <textarea
                    rows="3"
                    cols="40"
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
