import React, {Component} from 'react';
import './App.css';
import './components/movie-list';
import MovieList from './components/movie-list';
import MovieDetail from './components/movie-detail';
import MovieFormEdit from './components/movie-form-edit';
import MovieFormAdd from './components/movie-form-add';

class App extends Component {
  constructor(){
    super();
    this.state = {
        movies: null,
        selectedMovie: null,
        editedMovie: null,
        addedMovie: false
    }
  }

  /* Get Movies */
  componentDidMount() {
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

  /* Load selected movie */
  loadMovie = lMovie => {
    const tmpMovies = this.state.movies.map( movie => {
      if(movie.id === lMovie.id) {
        return lMovie
      } else {
        return movie
      }
    });
    this.setState({movies: tmpMovies, selectedMovie: lMovie, editedMovie: null, addedMovie: false});
  }

  /* Edit Movie */
  editMovie = lMovie => {
    const tmpMovies = this.state.movies.map( movie => {
      if(movie.id === lMovie.id) {
        return lMovie
      } else {
        return movie
      }
    });
    this.setState({movies: tmpMovies, selectedMovie: null, editedMovie: lMovie, addedMovie: false});
  }

  /* Add Movie */
  addMovie = () => {
    this.setState({selectedMovie: null, editedMovie: null, addedMovie: true})
  }

  addedMovie = movie => {
    const tmpMovies = [...this.state.movies, movie];
    this.setState({movies: tmpMovies, addedMovie: false})
  }

  /* Cancle Adding */
  cancleAdd = () => {
    this.setState({addedMovie: false})
  }

  render() {
    return (
      <div className="App">
        <h1>Movie Rater</h1>
        {this.state.movies ? <MovieList movies={this.state.movies} movieClicked={this.loadMovie} movieDeleted={this.removeMovie} movieEdited={this.editMovie} movieAdded={this.addMovie} /> : 'loading movies...'}
        {this.state.selectedMovie ? <MovieDetail movie={this.state.selectedMovie} updateMovie={this.loadMovie}/> : ''}
        {this.state.editedMovie ? <MovieFormEdit movie={this.state.editedMovie} updateMovie={this.editMovie} cancleEdit={this.loadMovie}/> : ''}
        {this.state.addedMovie ? <MovieFormAdd updateMovie={this.addedMovie} cancleAdd={this.cancleAdd}/> : ''}
      </div>
    )
  }
}

export default App;
