import React from "react";
import styles from "../app.css";
import DeleteSearch from "./deleteSearch";
import EditSearch from "./editSearch"

class SearchConfig extends React.Component {
  componentDidMount() {
    this.props.subscribeToMore();
  }

  render() {
    const items = this.props.data.listSearchConfigs.items;

    return (
      <div className={styles.divTable}>
        {items.map((searchConfig) => {
          return (
            <div className={styles.divTableRow} key={searchConfig.id}>
              <div className={styles.divTableCol}>
                {searchConfig.searchItem}
              </div>
              <div className={styles.divTableCol}>
                {searchConfig.searchString}
              </div>
              <div className={styles.divTableCol}>{searchConfig.rss}</div>
              <div className={styles.divTableCol}>{searchConfig.strict}</div>
              <div className={styles.divTableCol}>
                <DeleteSearch {...searchConfig} />
              </div>
              <div className={styles.divTableCol}>
                <EditSearch {...searchConfig} />
              </div>
              <br />
            </div>
          );
        })}
      </div>
    );
  }
}

export default SearchConfig;
