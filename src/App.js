import React, { useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  useLocation,
  Route,
  Link
} from "react-router-dom";
import 'font-awesome/css/font-awesome.min.css';
import { useNavigate } from 'react-router-dom';
import Home from './homepage.js'; 
import ProgramContainer from './programContainer.js';

const App = () => {
  let navigate = useNavigate();
  const titleMap = {
    '/': 'Popular Titles',
    '/home': 'Popular Titles',
    '/series': 'Popular Series',
    '/movies': 'Popular Movies'
  };
  const onHomeBtnClick = () => {
    navigate('/home');
  };

  return (
        <div>
            <header className="App-header">
              <div className="header-text">
                Demo Streaming
              </div>
              <div className="header-btns">
                <span className="login-btn">
                  <a> Log in</a>
                </span>
                <span>
                  <button className="trail-btn"> Start your free trial</button>
                </span>
              </div>
            </header>
            <header className="sec-app-header">
                <div className="home-btn" onClick={onHomeBtnClick}><i className="fa fa-home fa-lg home-btn-icon" aria-hidden="true"/></div>
                <div className="title-text">{titleMap[useLocation().pathname]}</div>
            </header>

            <Routes>
              <Route exact path="/" element={<Home/>}/>
              <Route exact path="/home" element={<Home/>}/>
              <Route exact path="/series" element={<ProgramContainer type="series"/>}/>
              <Route exact path="/movies" element={<ProgramContainer type="movie"/>}/>
            </Routes>
        </div>
  );
};


export default App;
