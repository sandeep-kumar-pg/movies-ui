import React, { Component } from "react";
import ActionUrl from "../services/ActionUrl";
import { Link } from "react-router-dom";

export default class MoviesList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveMovies = this.retrieveMovies.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveMovie = this.setActiveMovie.bind(this);
    this.searchTitle = this.searchTitle.bind(this);

    this.state = {
      movies: [],
      currentMovie: null,
      currentIndex: -1,
      searchTitle: ""
    };
  }

  componentDidMount() {
    this.retrieveMovies();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }

  retrieveMovies() {
    ActionUrl.getAll()
      .then(response => {
        this.setState({
          movies: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveMovies();
    this.setState({
      currentMovie: null,
      currentIndex: -1
    });
  }

  setActiveMovie(movie, index) {
    this.setState({
      currentMovie: movie,
      currentIndex: index
    });
  }

  searchTitle() {
    ActionUrl.findByTitle(this.state.searchTitle)
      .then(response => {
        this.setState({
          movies: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() 
    {
        const { searchTitle, movies, currentMovie, currentIndex } = this.state;
    
        return (
          <div className="list row">
            <div className="col-md-8">
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by Title"
                  value={searchTitle}
                  onChange={this.onChangeSearchTitle}
                />
                <div className="input-group-append">
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={this.searchTitle}
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <h4>Movies List</h4>    
              <ul className="list-group">
                {movies &&
                  movies.map((movie, index) => (
                    <li
                      className={
                        "list-group-item " +
                        (index === currentIndex ? "active" : "")
                      }
                      onClick={() => this.setActiveMovie(movie, index)}
                      key={index}
                    >
                      {movie.Title}
                    </li>
                  ))}
              </ul>    
              
            </div>
            <div className="col-lg-6">
              {currentMovie ? (
                <div>
                  <h4>Movie</h4>
                  <div>
                    <label>                      
                      <strong>Title:</strong>     
                    </label>{" "}
                    <Link to={"/movies/" + currentMovie.imdbID}> {currentMovie.Title} </Link> 
                  </div>
                  <div> 
                  <Link to={"/movies/" + currentMovie.imdbID}> <img src={currentMovie.Poster} /> </Link>               
                  </div> 
                  <div>
                    <label>
                      <strong>Language:</strong>
                    </label>{" "}
                    {currentMovie.Language}
                  </div>
                  <div>
                    <label>
                      <strong>Location:</strong>
                    </label>{" "}
                    {currentMovie.Location}
                  </div>
                  <div>
                    <label>
                        <strong>Listing Type:</strong>
                    </label>{" "}
                    {currentMovie.listingType}
                 </div> 
                </div>
              ) : (
                <div>
                  <br />
                  <p>Please click on a Movie for more insights...</p>
                </div>
              )}
            </div>
          </div>
        );
      }
  
}