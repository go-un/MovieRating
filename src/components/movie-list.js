import React from 'react';
import MovieCard from './movie-card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

function MovieList(props) {

  return (
    <div>
      <h2>Movie List</h2>
      {
        props.movies ? (
            <ul>
              { props.movies.map(movie => {
                return <li key={movie.id}> 
                  <MovieCard movie={movie} movieClicked={ () => props.movieClicked(movie)}/>
                  <button>
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button onClick={ () => props.movieDeleted(movie)}>
                    <FontAwesomeIcon icon={faTrash} /> 
                  </button>
                </li>
              })}
            </ul>
        ) : ''
      }
    </div>
  )
}

export default MovieList;