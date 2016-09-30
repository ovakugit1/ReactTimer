var expect = require('expect');
var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var $ = require('jQuery');

var Timer = require('Timer');
var state_to_set_to_start = 'started';
var state_to_set_to_pause = 'paused';
describe('Timer', () => {
  it('should exist', () => {
    expect(Timer).toExist();
  });
  describe('Timer behaviours', () => {
    it('should count up when status set to started', (done) => {
      var timer = TestUtils.renderIntoDocument(<Timer />);
      timer.handleStatusChange(state_to_set_to_start);
      var seconds_to_expect = 3;
      setTimeout(() => {
        expect(state_to_set_to_start).toBe(timer.state.countdownStatus);
        expect(seconds_to_expect).toBe(timer.state.count);
        done();
      }, 3001);
    });
    it('should stop counting when status set to paused and resume when restart', (done) => {
      var timer = TestUtils.renderIntoDocument(<Timer />);
      var state_to_set_to_start = 'started';
      var state_to_set_to_pause = 'paused';
      timer.handleStatusChange(state_to_set_to_start);
      var seconds_to_expect = 3;
      setTimeout(() => { // wait for it to count up to seconds_to_expect
        timer.handleStatusChange(state_to_set_to_pause); // stop the timer
        setTimeout(() => { // wait another 2 seconds to make sure the timer stopped and the count is seconds_to_expect
          expect(state_to_set_to_pause).toBe(timer.state.countdownStatus);
          expect(seconds_to_expect).toBe(timer.state.count);
          setTimeout(() => { // restart to test resume function.
            timer.handleStatusChange(state_to_set_to_start);
            expect(seconds_to_expect + 2).toBe(timer.state.count);
          }, 2001);
        }, 2001);
        done();
      }, 3001);
    });
    it('should stop and reset when status set to stopped', () => {
      var timer = TestUtils.renderIntoDocument(<Timer />);
      var state_to_set_to_stop = 'stopped';
      timer.handleStatusChange(state_to_set_to_start);
      setTimeout(()=>{
        var count_while_still_started = timer.state.count;
        timer.handleStatusChange(state_to_set_to_stop);
        var count_after_stopped = time.state.count;
        expect(count_while_still_started).toNotBe(count_after_stopped);
        expect(count_after_stopped).toBe(0);
      }, 2001);
    });
  });
});
