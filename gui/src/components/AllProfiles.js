import React from "react";
import { Query } from "react-apollo";
import { listProfileConfigs, listSearchConfigs } from "../graphql/queries";
import {
  onCreateProfileConfig,
  onUpdateProfileConfig,
  onDeleteProfileConfig,
  onCreateSearchConfig,
  onUpdateSearchConfig,
  onDeleteSearchConfig,
} from "../graphql/subscriptions";
import Profile from "./Profile";
import SearchConfig from "./SearchConfig";
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

  subNewSearch(subscribeToMore) {
    return subscribeToMore({
      document: gql(onCreateSearchConfig),
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newData = subscriptionData.data.onCreateSearchConfig;
        return Object.assign({}, prev, {
          listSearchConfigs: {
            ...prev.listSearchConfigs,
            items: [...prev.listSearchConfigs.items, newData],
          },
        });
      },
    });
  }

  subUpdatedSearch(subscribeToUpdate) {
    return subscribeToUpdate({
      document: gql(onUpdateSearchConfig),
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newData = subscriptionData.data.onUpdateSearchConfig;
        console.log("updatedItem", newData);
        return Object.assign({}, prev, {
          listSearchConfigs: {
            ...prev.listSearchConfigs,
            items: [
              ...prev.listSearchConfigs.items.filter(
                (item) => item.id !== newData.id
              ),
              newData,
            ],
          },
        });
      },
    });
  }

  subDeletedSearch(subscribeToDelete) {
    return subscribeToDelete({
      document: gql(onDeleteSearchConfig),
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newData = subscriptionData.data.onDeleteSearchConfig;
        console.log("deletedItem", newData);
        return Object.assign({}, prev, {
          listSearchConfigs: {
            ...prev.listSearchConfigs,
            items: [
              ...prev.listSearchConfigs.items.filter(
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
      <div>
        <div className={styles.divTable}>
          <Query query={gql(listProfileConfigs)}>
            {({
              loading,
              data,
              error,
              subscribeToMore,
              refetch,
              networkStatus,
            }) => {
              if (networkStatus === 4) return "Refetching!";
              if (loading) return <p>loading...</p>;
              if (error) return <p>{error.message}</p>;

              return (
                <div>
                  <Profile
                    data={data}
                    subscribeToMore={() => {
                      this.subNewProfile(subscribeToMore),
                        this.subUpdatedProfile(subscribeToMore),
                        this.subDeletedProfile(subscribeToMore);
                    }}
                  />
                  <button onClick={() => refetch()}>Refetch!</button>
                </div>
              );
            }}
          </Query>
        </div>
        <div className={styles.divTable}>
          <Query query={gql(listSearchConfigs)}>
            {({ loading, data, error, subscribeToMore }) => {
              if (loading) return <p>loading...</p>;
              if (error) return <p>{error.message}</p>;

              return (
                <SearchConfig
                  data={data}
                  subscribeToMore={() => {
                    this.subNewSearch(subscribeToMore),
                      this.subUpdatedSearch(subscribeToMore),
                      this.subDeletedSearch(subscribeToMore);
                  }}
                />
              );
            }}
          </Query>
        </div>
      </div>
    );
  }
}

export default AllProfiles;
