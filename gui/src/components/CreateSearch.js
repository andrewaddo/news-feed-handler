import React from "react";
import { Mutation } from "react-apollo";
import { createSearchConfig } from "../graphql/mutations";
import gql from "graphql-tag";
import styles from "../app.css"

class CreateSearch extends React.Component {
  handleSubmit(e, createSearchConfig) {
    if(!this.searchString.value && !this.rss.value) {
      console.log("Either searchString or RSS is needed");
      return
    }

    e.preventDefault();
    createSearchConfig({
      variables: {
        input: {
          profileID: this.props.selectedProfileID,
          searchItem: this.searchItem.value,
          searchString: this.searchString.value,
          rss: this.rss.value,
        },
      },
    }).then((res) => {
      // clear up input value
      this.searchItem.value = "";
      this.searchString.value = "";
      this.rss.value = "";
    });
  }

  render() {
    return (
      <div>
        <h1>Create Search</h1>

        <Mutation mutation={gql(createSearchConfig)}>
          {(createSearchConfig, { data, loading, error }) => {
            return (
              <div>
                <form
                  className="add-post"
                  onSubmit={(e) => this.handleSubmit(e, createSearchConfig)}
                >
                  <input
                    className={styles.input}
                    type="text"
                    placeholder="Search Item"
                    ref={(node) => (this.searchItem = node)}
                    required
                  />
                  <input
                    className={styles.input}
                    type="text"
                    placeholder="Search String"
                    ref={(node) => (this.searchString = node)}
                  />
                  <input
                    className={styles.input}
                    type="text"
                    placeholder="RSS"
                    ref={(node) => (this.rss = node)}
                  />
                  <button>{loading ? "Yes boss..." : "Create Search"}</button>
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

export default CreateSearch;
