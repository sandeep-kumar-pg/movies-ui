import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

import Movie from "./components/movie";
import MoviesList from "./components/movies-list";

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/movies" className="navbar-brand">
          Search Movies 
        </a>
      </nav>

      <div className="container mt-2">
        <Switch>
          <Route exact path={["/", "/movies"]} component={MoviesList} />          
          <Route path="/movies/:imdbID" component={Movie} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
