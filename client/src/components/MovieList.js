import { useQuery } from "@apollo/client";
import { GET_MOVIES_QUERY } from "../queries/queries";
import MovieDetailes from './MovieDetailes';
import { useState } from 'react';

const MovieList = () => {
  const { loading, data, error } = useQuery(GET_MOVIES_QUERY);
  const [selectedMovie, setSelectedMovie] = useState("");

  const handleClick = (event) => {
    setSelectedMovie(event.target.id);
  }

  if (loading) return <p>Loading...</p>
  if (error) return <div>Something went Wrong! <br /> {error.message}</div>;

  return (
    <div className="Movie">
        <h3>Movie List</h3>
        {data.movies.length !== 0 && (
          data.movies.map((movie) => {
            return (
              <div key={movie.id}>
                <button id={movie.id} key={movie.id} className="movie-item" onClick={handleClick}>
                  {movie.name}
                </button>
                {selectedMovie === movie.id && <MovieDetailes id={selectedMovie}/>}
              </div>
            )
          })
        )}
    </div>
  );
}

export default MovieList;
