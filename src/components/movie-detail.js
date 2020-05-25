import React, {Fragment} from 'react';

function MovieDetail(props) {

  return (
  <Fragment>
    { props.movie ?
      (
      <div>
        <h2>Movie "{props.movie.Title}" Detail</h2>
        <img src={props.movie.Poster} alt={props.movie.Title} />
          <div>{props.movie.Runtime}</div>
          <div>{props.movie.Genre}</div>
          <div>{props.movie.Actor}</div>
          <div>{props.movie.Director}</div>
          <div>{props.movie.Released}</div>
          <div>{props.movie.imdbRating}</div>
          <div>{props.movie.imdbVotes}</div>
      </div>
      ) : ''
    }
  </Fragment>
  )
}

export default MovieDetail;