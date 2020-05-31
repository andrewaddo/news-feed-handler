import React from "react";
import { updateSearchConfig as updateSearch } from "../graphql/mutations";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import styles from "../app.css";

class EditSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      searchData: {
        searchItem: this.props.searchItem,
        searchString: this.props.searchString,
        strict: this.props.strict,
        rss: this.props.rss, 
      },
    };
    this.handleModal = this.handleModal.bind(this);
    this.handleSearchItem = this.handleSearchItem.bind(this);
    this.handleSearchString = this.handleSearchString.bind(this);
    this.handleStrict = this.handleStrict.bind(this);
    this.handleRSS = this.handleRSS.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleModal() {
    this.setState({ show: !this.state.show });
    // document.body.scrollTop = 0;
    // document.documentElement.scrollTop = 0;
  }

  handleSubmit(e, updateSearch) {
    e.preventDefault();
    updateSearch({
      variables: {
        input: {
          id: this.props.id,
          searchItem: this.state.searchData.searchItem,
          searchString: this.state.searchData.searchString,
          strict: this.state.searchData.strict,
          rss: this.state.searchData.rss,
        },
      },
    }).then((res) => this.handleModal());
  }

  handleSearchItem(e) {
    this.setState({
      searchData: { ...this.state.searchData, searchItem: e.target.value },
    });
  }

  handleSearchString(e) {
    this.setState({
      searchData: { ...this.state.searchData, searchString: e.target.value },
    });
  }

  handleStrict(e) {
    this.setState({
      searchData: { ...this.state.searchData, strict: e.target.value },
    });
  }

  handleRSS(e) {
    this.setState({
      searchData: { ...this.state.searchData, rss: e.target.value },
    });
  }

  render() {
    return (
      <div>
        {this.state.show && (
          <div className="modal">
            <button className="close" onClick={this.handleModal}>
              X
            </button>
            <Mutation mutation={gql(updateSearch)}>
              {(updateSearch) => {
                return (
                  <form
                    className="add-post"
                    onSubmit={(e) => this.handleSubmit(e, updateSearch)}
                  >
                    <input
                      type="text"
                      required
                      value={this.state.searchData.searchItem}
                      onChange={this.handleSearchItem}
                    />
                    <input
                      type="text"
                      value={this.state.searchData.searchString}
                      onChange={this.handleSearchString}
                    />
                    <input
                      type="text"
                      placeholder="strict"
                      value={this.state.searchData.strict}
                      onChange={this.handleStrict}
                    />
                    <input
                      type="text"
                      placeholder="rss"
                      className={styles.wordwrap}
                      value={this.state.searchData.rss}
                      onChange={this.handleRSS}
                    />
                    <button>Update Search</button>
                  </form>
                );
              }}
            </Mutation>
          </div>
        )}
        <button onClick={this.handleModal}>Edit</button>
      </div>
    );
  }
}

export default EditSearch;
