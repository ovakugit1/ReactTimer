var expect = require('expect');
var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var $ = require('jQuery');

var Countdown = require('Countdown');
const CD_STATE_STOPPED = 'stopped';
const CD_STATE_STARTED = 'started';
const CD_STATE_PAUSED  = 'paused';
const CD_TIMER_TEST_VALUE = 1;
describe('Countdown', () => {
    it('should exist', () => {
        expect(Countdown).toExist();
    });
    describe('handleSetCountdown', () => {
        it('should set state to started and countdown', (done) => {
            var countdown = TestUtils.renderIntoDocument(<Countdown />);
            countdown.handleSetCountdown(CD_TIMER_TEST_VALUE);
            expect(countdown.state.count).toBe(CD_TIMER_TEST_VALUE);
            expect(countdown.state.countdownStatus).toBe(CD_STATE_STARTED);
            setTimeout(() => {
              expect(countdown.state.count).toBe(CD_TIMER_TEST_VALUE - 1);
              done();
            }, 1001);
        });
        it('should not go down below zero', (done) => {
          var countdown = TestUtils.renderIntoDocument(<Countdown />);
          countdown.handleSetCountdown(CD_TIMER_TEST_VALUE);
          setTimeout(() => {
            expect(countdown.state.count).toBe(0);
            done();
          }, 3001);
        });
    });
});
