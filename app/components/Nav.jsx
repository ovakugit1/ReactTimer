var React = require('react');
var {Link, IndexLink} = require('react-router');
var Nav = React.createClass({
  render: function() {
    return (
        <div className="top-bar">
          <div className="top-bar-left">
            <ul className="menu">
              <li className="menu-text">React Timer App</li>
              <li>
                <IndexLink to="/" activeClassName="active" activeStyle={{fontWeigth: 'bold'}}>Timer</IndexLink>
              </li>
              <li>
                <Link to="/countdown" activeClassName="active" activeStyle={{fontWeigth: 'bold'}}>Countdown</Link>
              </li>
            </ul>
          </div>

          <div className="top-bar-right">
            <ul className="menu">
              <li className="menu-text">
                Created by <a className="selam" href="https://github.com/ovakugit1/" target="_blank">Cem YILMAZ</a>
              </li>
            </ul>
          </div>
        </div>
    );
  }
});
module.exports = Nav;
