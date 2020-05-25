import React from 'react';

function MovieCard(props) {

  return (
    <div>
      <em>{props.movie.title}</em>
    </div>
  )
}

export default MovieCard;