import React from "react";
import styles from "../app.css";

class News extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedNewsID: "",
    };
    this.onNewsSelect = this.onNewsSelect.bind(this);
  }

  componentDidMount() {
    this.props.subscribeToMore();
  }

  onNewsSelect(event) {
    let selectedNewsID = event.target.value;
    this.setState({ selectedNewsID: selectedNewsID });
    this.props.onNewsSelect(event.target.value);
  }

  render() {
    const items = this.props.data.listNewss.items;

    return (
      <table>
        <tbody>
          <tr>
            <th>Search Item</th>
            <th>Title</th>
          </tr>
          {items.map((news) => {
            // display news for valid search config 
            return news.searchConfig && 
              <tr key={news.id}>
                <td>{news.searchConfig.searchItem}</td>
                <td>{news.title}</td>
              </tr>
            ;
          })}
        </tbody>
      </table>
    );
  }
}

export default News;
