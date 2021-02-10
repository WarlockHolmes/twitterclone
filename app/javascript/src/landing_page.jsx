import React from 'react'
import { capFirst } from './utils/utils';

const Input = (props) => {
  let type;
  if (props.purpose == "password") {
    type = props.purpose;
  } else {
    type = "text";
  }
  return (
    <div className="form-group">
      <input type={type} className={"form-control " + props.purpose} placeholder={capFirst(props.purpose)} onChange={props.handler}/>
    </div>
  )
}

const LogIn = (props) => {
  return (
    <React.Fragment>
      <div className="log-in">
        <form onSubmit={props.submit}>
          <Input purpose="username" handler={props.input}/>
          <Input purpose="password" handler={props.input}/>
          <button id="log-in-btn" className="btn btn-default btn-primary col-3">Log in</button>
          <label className="px-2">
            <input type="checkbox"/>
            <span className="px-1">Remember me</span>
            <span> &#183; </span>
          </label>
          <a href="#">Forgot password?</a>
        </form>
      </div>
    </React.Fragment>
  )
}

const SignUp = (props) => {
  return (
    <React.Fragment>
      <div className="sign-up">
        <form onSubmit={props.submit}>
          <div className="new-to-t text-center">
            <p><strong>New to Twitter?</strong></p>
          </div>
          <Input purpose="username" handler={props.input}/>
          <Input purpose="email" handler={props.input}/>
          <Input purpose="password" handler={props.input}/>
          <div className="text-center">
            <button id="sign-up-btn" className="btn">Sign up for Twitter</button>
          </div>
        </form>
      </div>
    </React.Fragment>
  )
}

const LandingPage = (props) => {
  return(
    <React.Fragment>
      <div id="homeback">
      </div>
      <nav className="navbar navbar-default navbar-fixed-top">
        <div className="container">
          <div className="float-left">
            <a className="navbar-brand" href="#">
              <i className="fa fa-twitter"></i>
            </a>
          </div>
          <div className="float-right dropdown">
            <a href="#" className="dropdown-toggle" id="language" data-toggle="dropdown" role="button" aria-expanded="false">Language: <strong>English </strong><span className="caret"></span></a>
            <div className="dropdown-menu">
              <a className="dropdown-item" href="#">Bahasa Malaya</a>
              <a className="dropdown-item" href="#">Dansk</a>
              <a className="dropdown-item" href="#">English</a>
              <a className="dropdown-item" href="#">Suomi</a>
            </div>
          </div>
        </div>
      </nav>
      <div className="main">
        <div className="container">
          <div className="row">
            <div className="front-card col-12">
              <div className="col-6 welcome d-inline-block align-top">
                <div id="welcome-text">
                  <h1><strong>Welcome to Twitter.</strong></h1>
                  <p>Connect with your friends &#8212; and other fascinating people. Get in-the-moment updates on the things that interest you. And watch events unfold, in real time, from every angle.</p>
                </div>
              </div>
              <div className="col-5 offset-1 d-inline-block">
                <LogIn input={props.input} submit={props.login}/>
                <SignUp input={props.input} submit={props.signup}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default LandingPage;
