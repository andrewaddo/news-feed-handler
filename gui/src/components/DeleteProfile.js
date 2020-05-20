import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { deleteProfileConfig } from "../graphql/mutations";
import gql from "graphql-tag";
import { listProfileConfigs } from "../graphql/queries";

class DeleteProfile extends Component {
  handleDelete(deleteProfile) {
    deleteProfile({
      variables: {
        input: {
          id: this.props.id,
        },
      },
      optimisticResponse: () => ({
        deleteProfile: {
          // This type must match the return type of
          //the query below (listProfileConfigs)
          __typename: "ModelProfileConnection",
          id: this.props.id,
          profile: this.props.profile,
          webhookURL: this.props.webhookURL
        },
      }),
      update: (cache, { data: { deleteProfile } }) => {
        const query = gql(listProfileConfigs);

        // Read query from cache
        const data = cache.readQuery({ query });

        // Add updated profileList to the cache copy
        data.listProfileConfigs.items = [
          ...data.listProfileConfigs.items.filter(
            (item) => item.id !== this.props.id
          ),
        ];

        //Overwrite the cache with the new results
        cache.writeQuery({ query, data });
      },
    });
  }

  render() {
    return (
      <Mutation mutation={gql(deleteProfileConfig)}>
        {(deleteProfile, { loading, error }) => {
          return (
            <button onClick={() => this.handleDelete(deleteProfile)}>
              Delete Profile
            </button>
          );
        }}
      </Mutation>
    );
  }
}

export default DeleteProfile;
