import React from 'react';

function MovieCard(props) {
  const movieClicked = movie => {
    props.movieClicked(movie);
  }

  return (
    <div onClick={() => movieClicked(props.movie)}>
      <em>{props.movie.title}</em>
    </div>
  )
}

export default MovieCard;