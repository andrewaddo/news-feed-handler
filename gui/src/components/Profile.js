import React from "react";

class Profile extends React.Component {
  componentDidMount() {
    this.props.subscribeToMore();
  }

  render() {
    const items = this.props.data.listProfileConfigs.items;

    return items.map((profile) => {
      return (
        <div>
          {JSON.stringify(profile)}
          {/* 
          <p>{profile.body}</p>
          <time dateTime={profile.createdAt}>
            {new Date(profile.createdAt).toDateString()}
          </time>
          <br /> */}
        </div>
      );
    });
  }
}

export default Profile;
