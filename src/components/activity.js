import React from 'react';
import Friend from './friend'
import toast from 'react-hot-toast';
import '../css/activity.css'

const fetch = require('node-fetch');


export default class Activity extends React.Component {
  constructor(props) {
    super(props);
    this.state = { friends: [], time: new Date() };
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.refreshFriends(),
      3000
    );
  }

  async refreshFriends() {
    try {
      const friends_proxy = await fetch('https://spotify-friend-proxy.herokuapp.com/friends')
      const friends = await friends_proxy.json();
      this.setState({ friends: friends.reverse(), time: new Date() });
    }
    catch (err) {
      toast.error("Fetch failed!");
    }
  }

  getLastFetchTime() {
    let curr = new Date()
    return (curr - this.state.time) / 1000 + "s"
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  render() {
    return (
      <div className="activity">
        <div className="title">
          <h1>Friend activity</h1>
          <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.6/css/all.css"></link>
          <div class="live-indicator-block">
            <span class="live-indicator">
              <i class="fa fa-circle blink" aria-hidden="true"></i>LIVE {this.getLastFetchTime()}
            </span>
          </div>
        </div>
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