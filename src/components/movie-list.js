import React from 'react';

function MovieList(props) {

  return (
    <div>
      <ul>
        { props.movies.map(movie => {
            return <li key={movie.id}>{movie.title}</li>
        })}
      </ul> 
    </div>
  )
}

export default MovieList;