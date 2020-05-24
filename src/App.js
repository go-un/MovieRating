import React, {Component} from 'react';
import './App.css';
import './components/movie-list';
import MovieList from './components/movie-list';

class App extends Component {
  state = {
    movies: []
  }

  componentDidMount() {
    // Fetch data from API
    fetch('http://127.0.0.1:8000/api/movies/', {
      method: 'GET',
      header: {
        'Authorization': 'Token ce28138ce1d4c352ee157087bcdc4b341b4a30b8'
      }
    })
    .then( response => response.json())
    .then( result => this.setState({movies: result}))
    .catch( error => console.log(error));
  }

  render() {
    return (
      <div className="App">
        <h1>Movie Rater</h1>
        <MovieList movies={this.state.movies} />
      </div>
    )
  }
}

export default App;
