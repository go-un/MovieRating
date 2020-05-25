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
    /* Fetch data from API */
    fetch(`${process.env.REACT_APP_API_URL}/api/movies/`, {
      method: 'GET',
      headers: {
        'Authorization': 'Token ce28138ce1d4c352ee157087bcdc4b341b4a30b8'
      }
    })
    .then( response => response.json())
    .then( result => this.setState({movies: result}))
    .catch( error => console.log(error));
  }

  loadMovie = (movie) => {
    this.setState({selectedMovie: movie});
  }

  render() {
    return (
      <div className="App">
        <h1>Movie Rater</h1>
        <MovieList movies={this.state.movies} movieClicked={this.loadMovie}/>
        <MovieDetail movie={this.state.selectedMovie} updateMovie={this.loadMovie}/>
      </div>
    )
  }
}

export default App;
