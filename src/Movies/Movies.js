import React, { Component } from 'react';
import './Movies.css';

import Showcase from '../Showcase/Showcase';
import Movie from '../Movie/Movie';
const API_KEY =`${process.env.REACT_APP_MOVIEDB_API_KEY}`


const MOVIES_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`;

class App extends Component {
  state = { movies: [], loading: false, error: false}
  async componentDidMount () {
    this.setState({loading: true})
    try {
      const response = await fetch(MOVIES_URL)
      const {results} = await response.json()
      this.setState({movies: results})
    } catch(error) {
      this.setState({error: true})
    } finally {
      this.setState({loading: false})
    }
  }
  render() {
    const {movies, loading, error} = this.state
    if (error) {
      return <p>Error 500!</p>
    }
    if (loading){
      return <p>Loading...</p>
    }

    return (
        <Showcase keyFn={movie => movie.id} items={movies} render={movie => 
          <Movie details={{
            title: `${movie.title}`,
            poster: `${movie.poster_path}`
        }}/>
        } />
    );
  }
}

export default App;
