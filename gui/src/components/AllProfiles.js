import React from "react";
import { Query } from "react-apollo";
import { listProfileConfigs } from "../graphql/queries";
import {
  onCreateProfileConfig,
  onUpdateProfileConfig,
  onDeleteProfileConfig,
} from "../graphql/subscriptions";
import Profile from "./Profile";
import gql from "graphql-tag";
import styles from "../app.css";

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

  subUpdatedProfile(subscribeToUpdate) {
    return subscribeToUpdate({
      document: gql(onUpdateProfileConfig),
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newData = subscriptionData.data.onUpdateProfileConfig;
        console.log("updatedItem", newData);
        return Object.assign({}, prev, {
          listProfileConfigs: {
            ...prev.listProfileConfigs,
            items: [
              ...prev.listProfileConfigs.items.filter(
                (item) => item.id !== newData.id
              ),
              newData,
            ],
          },
        });
      },
    });
  }

  subDeletedProfile(subscribeToDelete) {
    return subscribeToDelete({
      document: gql(onDeleteProfileConfig),
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newData = subscriptionData.data.onDeleteProfileConfig;
        console.log("deletedItem", newData);
        return Object.assign({}, prev, {
          listProfileConfigs: {
            ...prev.listProfileConfigs,
            items: [
              ...prev.listProfileConfigs.items.filter(
                (item) => item.id !== newData.id
              ),
            ],
          },
        });
      },
    });
  }

  render() {
    return (
      <div className={styles.divTable}>
        <Query query={gql(listProfileConfigs)}>
          {({ loading, data, error, subscribeToMore }) => {
            if (loading) return <p>loading...</p>;
            if (error) return <p>{error.message}</p>;

            return (
              <Profile
                data={data}
                subscribeToMore={() => {
                  this.subNewProfile(subscribeToMore),
                    this.subUpdatedProfile(subscribeToMore),
                    this.subDeletedProfile(subscribeToMore);
                }}
              />
            );
          }}
        </Query>
      </div>
    );
  }
}

export default AllProfiles;
