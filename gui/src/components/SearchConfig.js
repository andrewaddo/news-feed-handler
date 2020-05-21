import React from "react";
import styles from "../app.css";

class SearchConfig extends React.Component {
  componentDidMount() {
    this.props.subscribeToMore();
  }

  render() {
    const items = this.props.data.listSearchConfigs.items;

    return items.map((searchConfig) => {
      return (
        <div className={styles.divTableRow} key={searchConfig.id}>
          <div className={styles.divTableCol}>{searchConfig.searchItem}</div>
          <div className={styles.divTableCol}>{searchConfig.searchString}</div>
          <div className={styles.divTableCol}>{searchConfig.rss}</div>
          <div className={styles.divTableCol}>{searchConfig.strict}</div>
          <br />
        </div>
      );
    });
  }
}

export default SearchConfig;
