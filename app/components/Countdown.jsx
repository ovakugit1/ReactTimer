var React = require('react');
var Clock = require('Clock');
var CountdownForm = require('CountdownForm');

// countdown states
const CD_STATE_STOPPED = 'stopped';
const CD_STATE_STARTED = 'started';
const CD_STATE_PAUSED  = 'paused';
// countdown states

var Countdown = React.createClass({
  getInitialState: function () {
    return {
      count: 0,
      countdownStatus: CD_STATE_STOPPED
    };
  },
  componentDidUpdate: function (prevProps, prevState) {
    if (this.state.countdownStatus !== prevState.countdownStatus) {
      switch(this.state.countdownStatus){
        case CD_STATE_STARTED:
          this.startTimer();
          break;
      }
    }
  },
  startTimer: function () {
    this.timer = setInterval(() => {
      var newCount = this.state.count - 1;
      this.setState({
        count: (newCount >= 0 ? newCount : 0)
      });
    }, 1000);
  },
  handleSetCountdown: function (seconds) {
    this.setState({
      count: seconds,
      countdownStatus: CD_STATE_STARTED
    });
  },
  render: function() {
    var {count} = this.state;
    return (
      <div>
        <Clock totalSeconds={count}/>
        <CountdownForm onSetCountdown={this.handleSetCountdown} />
      </div>
    );
  }
});

module.exports = Countdown;
