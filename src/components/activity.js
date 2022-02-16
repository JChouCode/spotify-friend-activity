import React from 'react';
import Friend from './friend'
import '../css/activity.css'
const fetch = require('node-fetch');

export default class Activity extends React.Component {
  constructor(props) {
    super(props);
    this.state = { friends: [] };
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.refreshFriends(),
      3000
    );
  }

  async refreshFriends() {
    const friends_proxy = await fetch('http://localhost:3000/friends')
    const friends = await friends_proxy.json();
    this.setState({ friends: friends.reverse() });
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  render() {
    return (
      <div className="activity">
        <h1>Friend Activity</h1>
        <div className="friend_table">
          {
            this.state.friends.map(
              (friend) => <Friend
                timestamp={friend.timestamp}
                name={friend.user.name}
                pic={friend.user.imageUrl}
                userUri={friend.user.uri}
                track={friend.track.name}
                trackUri={friend.track.uri}
                trackUrl={friend.track.imageUrl}
                album={friend.track.album.name}
                albumUri={friend.track.album.uri}
                artist={friend.track.artist.name}
                artistUri={friend.track.artist.uri}
                context={friend.track.context.name}
                contextUri={friend.track.context.uri}
              />
            )
          }
        </div>
      </div>
    );
  }
}