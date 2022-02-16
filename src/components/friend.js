import React from 'react';
import '../css/friend.css'
import profile from '../assets/default.jpg'

export default class Friend extends React.Component {
  constructor(props) {
    super(props);
    this.state = { playing: false, diff: 0 }
  }

  componentDidMount() {
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

  render() {
    return (
      <div className="friend">
        <div className="user">
          <a href={this.props.userUri}>
            <div className="circle">
              <img className="profile" src={this.props.pic} />
            </div>
            <div className="name">{this.props.name}</div>
          </a>
        </div>
        <div className="track">
          <div className="trackCard">
            <img className="trackImg" src={this.props.trackUrl} alt="track img" />
            <div className="trackDetails">
              <a href={this.props.trackUri} className="trackName">{this.props.track}</a>
              <a href={this.props.artistUri} className="artistName">{this.props.artist}</a>
              <a href={this.props.contextUri} className="contextName">{this.props.context}</a>
            </div>
          </div>
          <div className="playing">
            {
              this.state.playing ? <div>
                <span class="bar n1">A</span>
                <span class="bar n2">B</span>
                <span class="bar n3">c</span>
                <span class="bar n4">D</span>
                <span class="bar n5">E</span>
              </div> : this.state.diff + " mins"
            }
          </div>
        </div>
      </div>
    );
  }
}