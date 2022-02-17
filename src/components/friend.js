import React from 'react';
import '../css/friend.css'
import play from '../assets/play.png'

export default class Friend extends React.Component {
  constructor(props) {
    super(props);
    this.state = { playing: false, diff: 0 }
  }

  componentDidMount() {
    this.setPlaying()
    this.timerID = setInterval(
      () => this.setPlaying(),
      1000 * 60
    );
  }

  setPlaying() {
    let time = new Date(this.props.timestamp);
    let current = new Date();
    let diff = parseInt((current - time) / 1000 / 60) // diff in minutes
    // currently playing
    if (diff <= 4) {
      this.setState({ playing: true })
    } else {
      this.setState({ playing: false, diff: diff })
    }
  }

  minToTime(min) {
    if (min > 1440) { // more than a day
      return Math.round(min / 1440) + " days ago"
    }
    if (min > 60) {
      return Math.round(min / 60) + " hours ago"
    }
    return min + " mins ago"
  }

  render() {
    return (
      <div className="friend">
        <a className="user" href={this.props.userUri}>
          <div className="circle">
            <img className="profile" src={this.props.pic} />
          </div>
          <div className="name">{this.props.name}</div>
        </a>
        <div className="track">
          <a href={this.props.trackUri} className="trackCard">
            <div className="trackImage">
              <img className="trackImg" src={this.props.trackUrl} alt="track img" />
              <img className="play" src={play} />
            </div>
            <div className="trackDetails">
              <a href={this.props.trackUri} className="trackName">{this.props.track}</a>
              <a href={this.props.artistUri} className="artistName">{this.props.artist}</a>
              <a href={this.props.contextUri} className="contextName">{this.props.context}</a>
            </div>
          </a>
          <div className="playing">
            {
              this.state.playing ?
                <div className="now playing" id="music">
                  <span class="bar n1">A</span>
                  <span class="bar n2">B</span>
                  <span class="bar n3">c</span>
                  <span class="bar n4">D</span>
                  <span class="bar n5">E</span>
                </div>
                : this.minToTime(this.state.diff)
            }
          </div>
        </div>
      </div>
    );
  }
}