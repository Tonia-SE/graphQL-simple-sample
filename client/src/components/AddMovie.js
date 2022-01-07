import { useQuery, useMutation } from "@apollo/client";
import { useState } from "react";
import { GET_DIRECTORS_QUERY, ADD_MOVIE_MUTATION, GET_MOVIES_QUERY } from "../queries/queries";

const AddMovie = () => {
  const { loading, data, error } = useQuery(GET_DIRECTORS_QUERY);
  const [ addMovie ] = useMutation(ADD_MOVIE_MUTATION);
  const [name, setName] = useState('');
  const [genre, setGenre] = useState('');
  const [directorId, setDirectorId] = useState('');

  if (loading) return <p>Loading...</p>;

  const handleSetName = (event) => { setName(event.target.value) };
  const handleSetGenre = (event) => { setGenre(event.target.value) };
  const handleSetDirectorId = (event) => { setDirectorId(event.target.value) };

  const clearState = () => {
    setName("");
    setGenre("");
    setDirectorId("");
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    addMovie({ variables: { name, genre, directorId }, refetchQueries: [{ query: GET_MOVIES_QUERY }] });
    clearState();
  };

  const renderDirectors = () => {
    if(error) { return <option disabled>Something went wrong...</option>};
    if(loading) { return <option disabled>Loading directors data...</option>};
  
    return (
      <>
        {data.directors.lenght !== 0 
        && data.directors.map(director => (
          <option value={director.id} key={director.id}>
            {director.name}
          </option>
        ))}
      </>
    )
  }

  return (
    <div className="movie-add-wrapper">
      <form id="movie-add" onSubmit={handleSubmit}>
        <label htmlFor="movie-name" className="movie-label">Name</label>
        <input
          type="text" 
          name="movie-name" 
          id="movie-name"
          className="movie-input"
          value={name}
          onChange={handleSetName}
        />
        <label htmlFor="movie-genre" className="movie-label">Genre</label>
        <input
          type="text" 
          name="movie-genre" 
          id="movie-genre"
          className="movie-input"
          value={genre}
          onChange={handleSetGenre}
        />
        <label htmlFor="movie-director" className="movie-label">Director</label>
        <select
          type="select" 
          name="movie-director" 
          id="movie-director"
          className="movie-select"
          value={directorId}
          onChange={handleSetDirectorId}
        >
          <option>Selelct a director</option>
          {renderDirectors()}
        </select>
        <button 
          type="submit" 
          className="movie-button"
          disabled={!name || !genre || !directorId}
        >
          Add new movie
        </button>
      </form>
    </div>
  );
}

export default AddMovie;
