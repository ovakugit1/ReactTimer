var React = require('react');
var ReactDOM = require('react-dom');
var Clock = require('Clock');
var Controls = require('Controls');
var $ = require('jQuery');
// countdown states
const CD_STATE_STOPPED = 'stopped';
const CD_STATE_STARTED = 'started';
const CD_STATE_PAUSED  = 'paused';
// countdown states
var Timer = React.createClass({
  getInitialState: function () {
    return {
      count: 0,
      countdownStatus: CD_STATE_PAUSED
    };
  },
  handleStatusChange: function (newStatus) {
    this.setState({ countdownStatus: newStatus });
  },
  componentDidUpdate: function (prevProps, prevState) {
    if(this.state.count !== 0 && this.state.countdownStatus === CD_STATE_PAUSED)
      $(ReactDOM.findDOMNode(this))
      .find('button:contains(Start)')
      .text('Resume');
    if(this.state.countdownStatus !== prevState.countdownStatus) {
      switch (this.state.countdownStatus) {
        case CD_STATE_STARTED:
          this.startTimer();
          break;
        case CD_STATE_STOPPED:
          this.setState({count: 0});
        case CD_STATE_PAUSED:
          this.setState({ countdownStatus: CD_STATE_PAUSED });
          this.destroyTimer();
          break;
      }
    }
  },
  startTimer: function () {
    this.timer = setInterval(() => {
      var newCount = this.state.count + 1;
      this.setState({ count: newCount });
    }, 1000);
  },
  destroyTimer: function () {
    clearInterval(this.timer);
    this.timer = undefined;
  },
  render: function() {
    return (
      <div>
        <Clock totalSeconds={this.state.count} />
        <Controls countdownStatus={this.state.countdownStatus} onStatusChange={this.handleStatusChange} />
      </div>
    );
  }
});

module.exports = Timer;
