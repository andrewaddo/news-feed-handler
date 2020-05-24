import React from "react";
import { Query } from "react-apollo";
import { listNewss } from "../graphql/queries";
import {
  onCreateNews
} from "../graphql/subscriptions";
import gql from "graphql-tag";
import News from "./News";

class AllNews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedNewID: "",
    };
    this.onNewSelect = this.onNewSelect.bind(this);
  }

  onNewSelect(selectedNewID) {
    this.setState({ selectedNewID: selectedNewID });
  }

  subNewNews(subscribeToMore) {
    return subscribeToMore({
      document: gql(onCreateNews),
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newData = subscriptionData.data.onCreateNews;
        return Object.assign({}, prev, {
          listNewss: {
            ...prev.listNewss,
            items: [...prev.listNewss.items, newData],
          },
        });
      },
    });
  }

  render() {
    return (
      <div>
        <Query query={gql(listNewss)}>
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
                <div style={{"text-align":"right"}} ><button onClick={() => refetch()}>Refetch!</button></div>
                <News
                  onNewsSelect={this.onNewsSelect}
                  data={data}
                  subscribeToMore={() => {
                    this.subNewNews(subscribeToMore);
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

export default AllNews;
