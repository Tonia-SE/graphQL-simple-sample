import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import AddMovie from './components/AddMovie';
import MovieList from './components/MovieList';

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache: new InMemoryCache(),
})

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <h1>Watch list</h1>
        <MovieList/>
        <AddMovie/>
      </div>
    </ApolloProvider>
  );
}

export default App;
