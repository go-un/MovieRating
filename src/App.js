import React, {Component} from 'react';
import './App.css';
import './components/movie-list';
import MovieList from './components/movie-list';
import MovieDetail from './components/movie-detail';

class App extends Component {
  constructor(){
    super();
    this.state = {
        movies: null,
        selectedMovie: null
    }
  }

  componentDidMount() {
    /* Fetch data from API
    fetch('http://127.0.0.1:8000/api/movies/', {
      method: 'GET',
      header: {
        'Authorization': 'Token ce28138ce1d4c352ee157087bcdc4b341b4a30b8'
      }
    })
    .then( response => response.json())
    .then( result => this.setState({movies: result}))
    .catch( error => console.log(error));
    */

    /* Fetch The Open Movie Database API */
    fetch('http://www.omdbapi.com/?apikey=a9ea15cf&s=baby', {
        method: 'GET'
    })
    .then( response => response.json())
    .then( result => this.setState( {movies: result}) )
    .catch( error => console.log(error));

  }

  movieClidked = (movie) => {
    /*
    this.setState({selectedMovie: movie});
    */

    /* Fetch The Open Movie Database API for detail */
    fetch(`http://www.omdbapi.com/?apikey=a9ea15cf&i=${movie.imdbID}`, {
        method: 'GET'
    })
    .then( response => response.json())
    .then( result => this.setState( {selectedMovie: result}) )
    .catch( error => console.log(error));
  }

  render() {
    return (
      <div className="App">
        <h1>Movie Rater</h1>
        <MovieList movies={this.state.movies} movieClicked={this.movieClidked}/>
        <MovieDetail movie={this.state.selectedMovie} />
      </div>
    )
  }
}

export default App;
