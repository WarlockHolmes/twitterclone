import React from 'react';

import Template from './template';
import LandingPage from './landing_page';
import Feed from './feed';
import { safeCredentials, handleErrors } from './utils/fetchHelper';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      login: false,
      username: '',
      email: '',
      password: '',
      usercount: 0
    }
    this.checkAuthenticated = this.checkAuthenticated.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.submitLogIn = this.submitLogIn.bind(this);
    this.submitSignUp = this.submitSignUp.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
  }

  componentDidMount() {
    this.checkAuthenticated();
  }

  componentWillUnmount() { }

  checkAuthenticated() {
    fetch(`/api/authenticated`, safeCredentials({
      method: 'GET',
      }))
    .then(handleErrors)
    .then(res => {
      if (res.authenticated){
        this.setState({username: res.username})
        this.setState({login: true})
      }
    }).catch((error) => {
      console.log(error);
    })
  }

  handleInput () {
    event.preventDefault();
    let { value, placeholder } = event.target;
    switch (placeholder) {
      case 'Username': this.setState({ username: value }); break;
      case 'Email': this.setState({ email: value }); break;
      case 'Password': this.setState({ password: value }); break;
    }
  }

  submitLogIn () {
    let { username, password } = this.state;
    fetch(`/api/sessions`, safeCredentials({
      method: 'POST',
      body: JSON.stringify({
        user: {
          username: username,
          password: password,
        }
      })
    }))
    .then(handleErrors)
    .then(res => {
      console.log(res)
      if(res.success){
        this.setState({login: true})
      };
    }).catch((error) => {
      console.log(error);
    })
  }

  submitSignUp () {
    event.preventDefault();
    let { username, email, password } = this.state;
    fetch(`/api/users`, safeCredentials({
      method: 'POST',
      body: JSON.stringify({
        user: {
          username: username,
          email: email,
          password: password,
        }
      })
    }))
    .then(handleErrors)
    .then(res => {
      console.log(res);
      if (res.user){
        this.submitLogIn();
      };
    }).catch((error) => {
      console.log(error);
    })
  }

  handleLogOut () {
    fetch(`/api/sessions`, safeCredentials({
      method: 'DELETE',
    }))
    .then(handleErrors)
    .then(res => {
      if(res.success){
        this.setState({login: false})
      };
    }).catch((error) => {
      console.log(error);
    })
  }

  render() {

    const { login, username, input, background, usercount} = this.state;

    const Home = (props) => (
      <Template user={username} logout={this.handleLogOut}>
        <Feed user={username}/>
      </Template>
    )

    return (
      <React.Fragment>
        {!login && <LandingPage input={this.handleInput} signup={this.submitSignUp} login={this.submitLogIn} />}
        {login && <Home/>}
      </React.Fragment>
    );
  }
}

export default App;
