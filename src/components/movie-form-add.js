import React, {Component} from 'react';

class MovieFormAdd extends Component {
  state = {
    addedMovie: {
      title: null,
      description: null
    },
    token: this.props.token
  }

  onInputChange = event => {
    let movie = this.state.addedMovie;
    movie[event.target.name] = event.target.value;
    this.setState({addedMovie: movie});
  }

  addClicked = movie => {
    /* Post data */
    fetch(`${process.env.REACT_APP_API_URL}/api/movies/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': `Token ${this.state.token}`
      },
      body: JSON.stringify(this.state.addedMovie)
    })
    .then( response => response.json())
    .then( result => this.props.updateMovie(movie))
    .catch( error => console.log(error));
  }

  render() {
    return (
      <div>
        <h2>Add New Movie</h2>
          <div>Title :</div>
          <input placeholder="Add movie name" type="text" name="title" onChange={ event => this.onInputChange(event) } />
          <div>description :</div>
          <textarea placeholder="Explain about the movie" name="description" onChange={ event => this.onInputChange(event) } />
          <button onClick={() => this.addClicked(this.state.addedMovie) }>Add</button>
          <button onClick={() => this.props.cancleAdd() }>Cancle</button>
      </div>
    )
  }
}

export default MovieFormAdd;