import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { Router } from 'react-router';

class Greeting extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {

    e.preventDefault();
    this.props.logout().then(() => {
      this.props.requestClear()
      this.props.history.push('/')
    })
  }

  render() {

    const user = this.props.currentUser;

    if(user === null) {
      return (
        <div className="nav-container">
          <Link to='/'>
            <h1 className="gymbump-header">GYM BUMP</h1>
          </Link>
          <div className="signup-nav">
            <button className="login-home-button" onClick={() => this.props.history.push('/login')}>
              Login
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="nav-container">
        <Link to='/'>
          <h1 className="gymbump-header">GYM BUMP</h1>
        </Link>
          <div className="signup-nav">
          <Link to='/workouts'>
            <h3>Leaderboard</h3>
          </Link>
          <button className="logout-home-button" onClick={this.handleSubmit}>
            Logout
          </button>
        </div>
      </div>
    );


  }
}

export default withRouter(Greeting);
