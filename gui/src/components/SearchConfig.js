import React from "react";
import styles from "../app.css";
import DeleteSearch from "./deleteSearch";
import EditSearch from "./editSearch";

class SearchConfig extends React.Component {
  componentDidMount() {
    this.props.subscribeToMore();
  }

  render() {
    const items = this.props.data.listSearchConfigs.items;

    return (
      <table>
        <tbody>
          <tr>
            <th>Search item</th>
            <th>Search string</th>
            <th>RSS</th>
            <th>Strict</th>
            <th>Delete</th>
            <th>Edit</th>
          </tr>
          {items.map((searchConfig) => {
            return (
              <tr key={searchConfig.id}>
                <td>{searchConfig.searchItem}</td>
                <td>{searchConfig.searchString}</td>
                <td>{searchConfig.rss}</td>
                <td>{searchConfig.strict}</td>
                <td>
                  <DeleteSearch {...searchConfig} />
                </td>
                <td>
                  <EditSearch {...searchConfig} />
                </td>
                <br />
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

export default SearchConfig;
