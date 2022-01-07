import './styles.css'
import { useQuery } from '@apollo/client';
import { GET_MOVIE_QUERY } from '../queries/queries';

const MovieDetailes = ({ id }) => {
  const { loading, data, error } = useQuery(GET_MOVIE_QUERY, {
    skip: !id,
    variables: { id }
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Something went Wrong! <br /> {error.message}</div>;

  const renderMovieDetails = () => {
    const { movie } = data || {}

    if (movie) {
      return (
        <div>
          <h2>{movie.name}</h2>
          <p>Genre: {movie.genre}</p>
          <p>Directed By: {movie.director.name}</p>
          <p>All movies by this director:</p>
          <ul className="other-movies">
            {movie.director.movies.map((item) => {
                return <li key={item.id}>{item.name}</li>;
            })}
          </ul>
        </div>
      )
    }
  }

  return (
    <div className="movie-detail">
      {renderMovieDetails()}
    </div>
  );
}

export default MovieDetailes;
