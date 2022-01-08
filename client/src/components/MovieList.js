import { useQuery, useMutation } from "@apollo/client";
import { GET_MOVIES_QUERY, DELETE_MOVIE_MUTATION } from "../queries/queries";
import MovieDetailes from './MovieDetailes';
import { useState } from 'react';

const MovieList = () => {
  const [deleteMovie] = useMutation(DELETE_MOVIE_MUTATION);
  const { loading, data, error } = useQuery(GET_MOVIES_QUERY);
  const [selectedMovie, setSelectedMovie] = useState("");

  if (loading) return <p>Loading...</p>
  if (error) return <div>Something went Wrong! <br /> {error.message}</div>;

  const handleClick = (event) => {
    setSelectedMovie(event.target.id);
  }

  const handleDelete = (event) => {
    deleteMovie({variables: {id: event.target.id}, refetchQueries: [{ query: GET_MOVIES_QUERY }]})
  };

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
                <button 
                  type="button" 
                  className="movie-button"
                  disabled={data.movies.length === 0}
                  id={movie.id} 
                  key={(Math.random()*1000).toString()}
                  onClick={handleDelete}
                >
                  Delete
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
