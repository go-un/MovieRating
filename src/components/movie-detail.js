import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKissWinkHeart, faStar, faUserFriends } from '@fortawesome/free-solid-svg-icons';

class MovieDetail extends Component {

  constructor(){
    super();
    this.state = {
        hightlighted: -1
    }
  }

  highlightRate = high => {
    this.setState({highlighted: high});
  }

  /* Post data */
  postRate = rate => {
    fetch(`${process.env.REACT_APP_API_URL}/api/movies/${this.props.movie.id}/rate_movie/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': 'Token ce28138ce1d4c352ee157087bcdc4b341b4a30b8'
      },
      body: JSON.stringify({
        'stars': rate
      })
    })
    .then( response => response.json())
    .then( () => this.getDetail())
    .catch( error => console.log(error));
  }

  getDetail = () => {
    fetch(`${process.env.REACT_APP_API_URL}/api/movies/${this.props.movie.id}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': 'Token ce28138ce1d4c352ee157087bcdc4b341b4a30b8'
      }
    })
    .then( response => response.json())
    .then( result => this.props.updateMovie(result))
    .catch( error => console.log(error));    
  }

  render(){
    return (
      <div>
        <h2>About {this.props.movie.title} <FontAwesomeIcon icon={faKissWinkHeart} /></h2>
        <div>{this.props.movie.description}</div>
        <div>
          {
            [...Array(5)].map( (event, index) => <FontAwesomeIcon icon={faStar} key={index} className={ (this.props.movie.avg_ratings > index) ? "orange" : ""} />)
          }
          (<FontAwesomeIcon icon={faUserFriends} /> {this.props.movie.no_of_ratings})
        </div>
        <div>{this.props.movie.avg_ratings}</div>

        <div>
          <h3>Rate it yourself</h3>
          <div className="clickable">
          {
            [...Array(5)].map( (item, index) => <FontAwesomeIcon icon={faStar} key={index} className={ (this.state.highlighted > index - 1) ? "purple" : ""} onClick={() => this.postRate(index + 1)} onMouseEnter={() => this.highlightRate(index)} onMouseLeave={() => this.highlightRate(index)} />)
          }
          </div>
        </div>
      </div>
    )
  }
}

export default MovieDetail;