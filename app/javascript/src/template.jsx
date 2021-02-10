import React from 'react';

const Nav = (props) => {
  return (
    <React.Fragment>
      <nav className="navbar navbar-default navbar-fixed-top">
        <div className="container">
          <div className="navbar-header">
            <a className="navbar-brand" href="#">
              <i className="fa fa-twitter"></i>
            </a>
          </div>
          <div className="search-bar ml-auto nav navbar-right">
            <div className="input-group">
              <input type="text" className="form-control search-input" placeholder="Search for..."/>
              <span className="input-group-btn">
                <button className="btn btn-default search-btn" type="button">Go!</button>
              </span>
            </div>
          </div>
          <div className="dropdown ml-5">
            <a className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"><span id="user-icon">{props.user}</span></a>
            <div className="dropdown-menu dropdown-menu-right" role="menu">
              <a href="#" className="username dropdown-item">User</a>
              <a href="#" className="dropdown-item">Lists</a>
              <a href="#" className="dropdown-item">Help</a>
              <a href="#" className="dropdown-item">Keyboard shortcuts</a>
              <a href="#" className="dropdown-item">Settings</a>
              <a className="dropdown-item" id="log-out" onClick={props.logout}>Log out</a>
            </div>
          </div>
        </div>
      </nav>
    </React.Fragment>
  );
}

const Trends = (props) => {
  return (
    <div className="trends col-3">
      <div className="col-12">
        <div className="trends-header">
          <span>Trends</span><span> &#183; </span><small><a href="">Change</a></small>
        </div>
        <ul className="trends-list">
          <li><a href="#">#Hongkong</a></li>
          <li><a href="#">#Ruby</a></li>
          <li><a href="#">#foobarbaz</a></li>
          <li><a href="#">#rails</a></li>
          <li><a href="#">#API</a></li>
        </ul>
      </div>
    </div>
  )
}

const Template = (props) => {
  return (
    <React.Fragment>
      <Nav user={props.user} logout={props.logout}/>
      <div className="main container">
        <div className="row">
          {props.children}
          <Trends/>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Template;
