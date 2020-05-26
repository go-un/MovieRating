import React, {Component} from 'react';

class MovieForm extends Component {
  constructor(){
    super();
    this.state = {
      title: null,
      description: null
    }
  }

  /* Post data */
  postMovie = movie => {
    fetch(`${process.env.REACT_APP_API_URL}/api/movies/${this.props.movie.id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': 'Token ce28138ce1d4c352ee157087bcdc4b341b4a30b8'
      },
      body: JSON.stringify({
        'title': movie.title,
        'description': movie.description
      })
    })
    .then( response => response.json())
    .then( result => this.props.updateMovie(result))
    .catch( error => console.log(error));
  }

  render(){
    return (
      <div>
        <h2>Edit Movie Information</h2>
          <div>Title :</div>
          <input placeholder={this.props.movie.title} type="text" onChange={ event => this.setState({title: event.target.value})} />
          <div>description :</div>
          <textarea placeholder={this.props.movie.description} onChange={ event => this.setState({description: event.target.value})} />
          <button onClick={() => {
            const tmpMovie = this.props.movie;
            tmpMovie.title = this.state.title;
            tmpMovie.description = this.state.description;
            this.postMovie(tmpMovie);
          }}>Save</button>
      </div>
    )
  }
}

export default MovieForm;