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

class AllProfiles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedProfileID: "",
    };
    this.onProfileSelect = this.onProfileSelect.bind(this);
  }

  onProfileSelect(selectedProfileID) {
    this.setState({ selectedProfileID: selectedProfileID });
  }

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
                <button onClick={() => refetch()}>Refetch!</button>
                <Profile
                  onProfileSelect={this.onProfileSelect}
                  data={data}
                  subscribeToMore={() => {
                    this.subNewProfile(subscribeToMore),
                      this.subUpdatedProfile(subscribeToMore),
                      this.subDeletedProfile(subscribeToMore);
                  }}
                />
              </div>
            );
          }}
        </Query>
        <div>Selected profileID is {this.state.selectedProfileID}</div>
        <Query
          query={gql(listSearchConfigs)}
          variables={{
            filter: {
              profileID: {"eq": this.state.selectedProfileID},
            },
          }}
        >
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
                <button onClick={() => refetch()}>Refetch!</button>

                <SearchConfig
                  data={data}
                  subscribeToMore={() => {
                    this.subNewSearch(subscribeToMore),
                      this.subUpdatedSearch(subscribeToMore),
                      this.subDeletedSearch(subscribeToMore);
                  }}
                />
              </div>
            );
          }}
        </Query>
      </div>
    );
  }
}

export default AllProfiles;
