import React, { Component } from "react";
import ActionUrl from "../services/ActionUrl";

export default class Movie extends Component {
  constructor(props) {
    super(props);
    // this.onChangeTitle = this.onChangeTitle.bind(this);
    this.getMovie = this.getMovie.bind(this);

    this.state = {
      currentMovie: {
        Language: "",
        Location: "",
        Plot: "",
        Poster: "",
        SoundEffects:"",
        Stills: [],
        Title: "",
        imdbID: "",
        listingType: "",
        imdbRating: "",
      }
    };
  }

  componentDidMount() {
    this.getMovie(this.props.match.params.imdbID);
  }

  getMovie(imdbID) {
    ActionUrl.get(imdbID)
      .then(response => {
        this.setState({
          currentMovie: response.data[0]
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }


  render() {
    const { currentMovie } = this.state;

    return (
      <div>
        {currentMovie ? (
          <div>
          <h4>{currentMovie.Title}</h4>
          <div>
            <label>
              <strong>Title:</strong>
            </label>{" "}
            {currentMovie.Title}
          </div>
          <div> 
            <img src={currentMovie.Poster} />                   
          </div> 
          <div>
            <label>
              <strong>Language:</strong>
            </label>{" "}
            {currentMovie.Language}
          </div>
          <div>
            <label>
              <strong>Listing Type:</strong>
            </label>{" "}
            {currentMovie.listingType}
          </div>
           
          <div>
            <label>
              <strong>Plot:</strong>
            </label>{" "}
            {currentMovie.Plot}
          </div>                      
          <div>
            <label>
              <strong>Location:</strong>
            </label>{" "}
            {currentMovie.Location}
          </div>
          <div>
            <label>
              <strong>Imdb ID:</strong>
            </label>{" "}
            {currentMovie.imdbID}
          </div> 
          <div>
            <label>
              <strong>Imdb Rating:</strong>
            </label>{" "}
            {currentMovie.imdbRating}
          </div>
          
          <div>
            {currentMovie.Stills.map((imgSrc) => (<img src={imgSrc} />))}
          </div>               
        </div>
        ) : (
          <div>
            <br />
            <p>Something went Worng!!</p>
          </div>
        )}
      </div>
    );
  }
}
