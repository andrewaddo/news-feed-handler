import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { deleteSearchConfig } from "../graphql/mutations";
import gql from "graphql-tag";
import { listSearchConfigs } from "../graphql/queries";

class DeleteSearch extends Component {
  handleDelete(deleteSearch) {
    deleteSearch({
      variables: {
        input: {
          id: this.props.id,
        },
      },
      optimisticResponse: () => ({
        deleteSearch: {
          // This type must match the return type of
          //the query below (listSearchConfigs)
          __typename: "ModelSearchConnection",
          id: this.props.id,
          searchItem: this.props.searchItem,
          searchString: this.props.searchString,
          rss: this.props.rss
        },
      }),
      update: (cache, { data: { deleteSearch } }) => {
        const query = gql(listSearchConfigs);

        // Read query from cache
        const data = cache.readQuery({ query });

        // Add updated searchList to the cache copy
        data.listSearchConfigs.items = [
          ...data.listSearchConfigs.items.filter(
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
      <Mutation mutation={gql(deleteSearchConfig)}>
        {(deleteSearch, { loading, error }) => {
          return (
            <button onClick={() => this.handleDelete(deleteSearch)}>
              Delete Search
            </button>
          );
        }}
      </Mutation>
    );
  }
}

export default DeleteSearch;
