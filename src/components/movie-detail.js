import React, {Fragment} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKissWinkHeart, faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';

function MovieDetail(props) {

  return (
  <Fragment>
    { props.movie ?
      (
      <div>
        <h2>Movie "{props.movie.Title}" Detail <FontAwesomeIcon icon={faKissWinkHeart} /></h2>
        <img src={props.movie.Poster} alt={props.movie.Title} />
        <div>runtime: {props.movie.Runtime}</div>
        <div>genre: {props.movie.Genre}</div>
        <div>actors: {props.movie.Actors}</div>
        <div>director: {props.movie.Director}</div>
        <div>released: {props.movie.Released}</div>
        <div>IMDB rating:
          <FontAwesomeIcon icon={props.movie.imdbRating >= 2 ? faStar : props.movie.imdbRating > 0 ? faStarHalfAlt : ''} />
          <FontAwesomeIcon icon={props.movie.imdbRating >= 4 ? faStar : faStarHalfAlt} />
          <FontAwesomeIcon icon={props.movie.imdbRating >= 6 ? faStar : faStarHalfAlt} />
          <FontAwesomeIcon icon={props.movie.imdbRating >= 8 ? faStar : faStarHalfAlt} />
          <FontAwesomeIcon icon={props.movie.imdbRating >= 10 ? faStar : faStarHalfAlt} />
          ( { props.movie.imdbRating } )
        </div>
        <div>IMDB votes: {props.movie.imdbVotes}</div>
      </div>
      ) : ''
    }
  </Fragment>
  )
}

export default MovieDetail;