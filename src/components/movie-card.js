import React from 'react';

function MovieCard(props) {

  return (
    <div>
      <h3>{props.movie.Title}</h3>
      <div>
        <img src={props.movie.Poster} alt={props.movie.Title} />
        <div>{props.movie.Year}</div>
      </div>
    </div>
  )
}

export default MovieCard;