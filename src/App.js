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
    this.loadMovies();
  }

  /* Get Movies */
  loadMovies = () => {
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

  /* Set Selected Movie */
  loadMovie = movie => {
    this.setState({selectedMovie: movie});
  }

  /* Delete Movie */
  removeMovie = delMovie => {
    fetch(`${process.env.REACT_APP_API_URL}/api/movies/${delMovie.id}/`, {
      method: 'DELETE',
      headers: {
        'Authorization': 'Token ce28138ce1d4c352ee157087bcdc4b341b4a30b8'
      }
    })
    .then( () => {
      /* Change Movies state & Reset selectedMovie if it's deleted */
      const newMovies = this.state.movies.filter( movie => movie.id !== delMovie.id);
      (delMovie.id === this.state.selectedMovie.id) ? this.setState({movies: newMovies, selectedMovie: null}) : this.setState({movies: newMovies});
    } )
    .catch( error => console.log(error) );
  }

  render() {
    return (
      <div className="App">
        <h1>Movie Rater</h1>
        <MovieList movies={this.state.movies} movieClicked={this.loadMovie} movieDeleted={this.removeMovie}/>
        <MovieDetail movie={this.state.selectedMovie} updateMovie={this.loadMovie}/>
      </div>
    )
  }
}

export default App;
