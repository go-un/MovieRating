import React, {Component} from 'react';

class MovieFormEdit extends Component {
  state = {
    editedMovie: this.props.movie,
    token: this.props.token
  }

  saveClicked = movie => {
    /* Post data */
    fetch(`${process.env.REACT_APP_API_URL}/api/movies/${this.props.movie.id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': `Token ${this.state.token}`
      },
      body: JSON.stringify(this.state.editedMovie)
    })
    .then( response => response.json())
    .then( result => this.props.updateMovie(result))
    .catch( error => console.log(error));
  }

  cancleClicked = movie => {
    this.props.cancleEdit(movie);
  }

  onInputChange = event => {
    let movie = this.state.editedMovie;
    movie[event.target.name] = event.target.value;
    this.setState({editedMovie: movie});
  }

  render(){
    return (
      <div>
        <h2>Edit Movie Information</h2>
          <div>Title :</div>
          <input placeholder={this.props.movie.title} type="text" name="title" onChange={ event => this.onInputChange(event) } />
          <div>description :</div>
          <textarea placeholder={this.props.movie.description} name="description" onChange={ event => this.onInputChange(event) } />
          <button onClick={() => this.saveClicked(this.state.editedMovie)}>Save</button>
          <button onClick={() => this.cancleClicked(this.props.movie)}>Cancle</button>
      </div>
    )
  }
}

export default MovieFormEdit;