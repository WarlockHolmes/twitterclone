import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import './app.scss';
//import 'jquery/dist/jquery.min.js'
//import 'bootstrap/dist/js/bootstrap.min.js'

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <App />,
    document.body.appendChild(document.createElement('div')),
  )
})
