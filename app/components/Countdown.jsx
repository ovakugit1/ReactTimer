var React = require('react');
var Clock = require('Clock');
var CountdownForm = require('CountdownForm');
var Controls = require('Controls');

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
  destroyTimer: function () {
    clearInterval(this.timer);
    this.timer = undefined;
  },
  componentDidUpdate: function (prevProps, prevState) {
    if (this.state.countdownStatus !== prevState.countdownStatus) {
      switch(this.state.countdownStatus){
        case CD_STATE_STARTED:
          this.startTimer();
          break;
        case CD_STATE_STOPPED:
          this.setState({count: 0});
        case CD_STATE_PAUSED:
          this.destroyTimer();
          break;
      }
    }
  },
  componentWillMount: function () { this.destroyTimer(); },
  startTimer: function () {
    this.timer = setInterval(() => {
      var newCount = this.state.count - 1;
      this.setState({
        count: (newCount >= 0 ? newCount : 0),
        countdownStatus: newCount === 0 ? CD_STATE_STOPPED : this.state.countdownStatus
      });
    }, 1000);
  },
  handleSetCountdown: function (seconds) {
    this.setState({
      count: seconds,
      countdownStatus: CD_STATE_STARTED
    });
  },
  handleStatusChange: function (newStatus) { this.setState({countdownStatus: newStatus}); },
  render: function() {
    var {count, countdownStatus} = this.state;
    var renderBottom = () => {
      if(countdownStatus !== CD_STATE_STOPPED) {
        return <Controls countdownStatus={countdownStatus} onStatusChange={this.handleStatusChange} />;
      } else {
        return <CountdownForm onSetCountdown={this.handleSetCountdown} />;
      }
    };
    return (
      <div>
        <Clock totalSeconds={count}/>
        {renderBottom()}
      </div>
    );
  }
});

module.exports = Countdown;
