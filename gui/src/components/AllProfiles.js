import React from "react";
import { Query } from "react-apollo";
import { listProfileConfigs } from "../graphql/queries";
import { onCreateProfileConfig } from "../graphql/subscriptions";
import Profile from './Profile'
import gql from "graphql-tag";

class AllProfiles extends React.Component {
  subNewProfile(subscribeToMore) {
    return subscribeToMore({
      document: gql(onCreateProfileConfig),
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newData = subscriptionData.data.onCreateProfileConfig;
        return Object.assign({}, prev, {
          listProfileConfigs: {
            ...prev.listProfileConfigs,
            items: [...prev.listProfileConfigs.items, newData],
          },
        });
      },
    });
  }

  render() {
    return (
      <div className="posts">
        <Query query={gql(listProfileConfigs)}>
          {({ loading, data, error, subscribeToMore }) => {
            if (loading) return <p>loading...</p>;
            if (error) return <p>{error.message}</p>;

            return (
              <Profile
                data={data}
                subscribeToMore={() => this.subNewProfile(subscribeToMore)}
              />
            );
          }}
        </Query>
      </div>
    );
  }
}

export default AllProfiles;
