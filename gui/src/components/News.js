import React from "react";
import styles from "../app.css";

class News extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedNewsID: '',
    };
    this.onNewsSelect = this.onNewsSelect.bind(this);
  }

  componentDidMount() {
    this.props.subscribeToMore();
  }

  onNewsSelect(event) {
    let selectedNewsID = event.target.value
    this.setState({selectedNewsID: selectedNewsID});
    this.props.onNewsSelect(event.target.value);
  }

  render() {
    const items = this.props.data.listNewss.items;

    return (
      <div className={styles.divTable}>
        {items.map((news) => {
          return (
            <div className={styles.divTableRow} key={news.id}>
              <div className={styles.divTableCol}>{news.searchConfig.searchItem}</div>
              <div className={styles.divTableCol}>{news.title}</div>
              <br />
            </div>
          );
        })}
      </div>
    );
  }
}

export default News;
