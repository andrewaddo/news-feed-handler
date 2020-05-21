import React from "react";
import DeleteProfile from "./deleteProfile";
import EditProfile from "./editProfile";
import styles from "../app.css";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedProfileID: '',
    };
    this.onProfileSelect = this.onProfileSelect.bind(this);
  }

  componentDidMount() {
    this.props.subscribeToMore();
  }

  onProfileSelect(event) {
    let selectedProfileID = event.target.value
    this.setState({selectedProfileID: selectedProfileID});
    this.props.onProfileSelect(event.target.value);
  }

  render() {
    const items = this.props.data.listProfileConfigs.items;

    return (
      <div className={styles.divTable}>
        {items.map((profile) => {
          return (
            <div className={styles.divTableRow} key={profile.id}>
              <div className={styles.divTableCol}>
                <input
                  type="radio"
                  value={profile.id}
                  checked={this.state.selectedProfileID === profile.id}
                  onChange={this.onProfileSelect}
                />
              </div>
              <div className={styles.divTableCol}>{profile.profile}</div>
              <div className={styles.divTableCol + " " + styles.wordwrap}>
                {profile.webhookURL}
              </div>
              <div className={styles.divTableCol}>
                <DeleteProfile {...profile} />
              </div>
              <div className={styles.divTableCol}>
                <EditProfile {...profile} />
              </div>
              <br />
            </div>
          );
        })}
      </div>
    );
  }
}

export default Profile;
