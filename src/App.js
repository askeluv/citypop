import React, { Component } from 'react';
import YouTube from 'react-youtube';

import getShuffledVideoUrls from './service';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      doneLoading: false,
      videoIndex: 0,
      videoUrls: []
    }
  }

  async componentWillMount() {
    this.setState({
      videoUrls: await getShuffledVideoUrls(),
      doneLoading: true
    })
  }

  playNext() {
    this.setState({
      ...this.state,
      videoIndex: (this.state.videoIndex + 1) % this.state.videoUrls.length
    })
  }

  render() {
    const opts = {
      height: '250',
      width: '300',
      playerVars: {
        autoplay: 1
      }
    };

    return (
      <div className="outer">
        <h1>citypop.fm</h1>
        {this.state.doneLoading && 
        <div className="youtube">
          <YouTube
            videoId={this.state.videoUrls[this.state.videoIndex]}
            opts={opts}
            onEnd={() => { this.playNext() }}
          />
          <div className="row">
            <h4 className="skip" onClick={this.playNext.bind(this)}>skip</h4>
            <h4 className="submit"><a href="https://txd.typeform.com/to/f5k4pd">submit song</a></h4>
          </div>
          <footer>Made with <span role="img" aria-label="japan">🇯🇵</span> by &nbsp;
            <a href="https://www.producthunt.com/@asvanevik" target="_blank" rel="noopener noreferrer">Alex</a>
          </footer>
        </div>
        }
      </div>
    );
  }
}

export default App;
