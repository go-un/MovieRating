import React from 'react';
import MovieCard from './movie-card';

function MovieList(props) {
  const movieClicked = movie => {
    props.movieClicked(movie);
  }

  return (
    <div>
      <h2>Movie List</h2>
        {
          props.movies ? (
            <ul>
              { props.movies.Search.map(movie => {
                return <li key={movie.imdbID} onClick={ () => movieClicked(movie)}> <MovieCard movie={movie}/> </li>
              })}
            </ul>
          ) : ''
        }
    </div>
  )
}

export default MovieList;