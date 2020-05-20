import React from "react";
import DeleteProfile from './deleteProfile'
import EditProfile from './editProfile'
import styles from "../app.css";

class Profile extends React.Component {
  componentDidMount() {
    this.props.subscribeToMore();
  }

  render() {
    const items = this.props.data.listProfileConfigs.items;

    return items.map((profile) => {
      return (
        <div className={styles.divTableRow} key={profile.id}>
          <div className={styles.divTableCol}>{profile.profile}</div>
          <div className={styles.divTableCol + ' ' + styles.wordwrap}>{profile.webhookURL}</div> 
          <div className={styles.divTableCol}><DeleteProfile {...profile} /></div>
          <div className={styles.divTableCol}><EditProfile {...profile} /></div>
          <br />
        </div>
      );
    });
  }
}

export default Profile;
