import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom'

import './Movies.css';
import Showcase from '../Showcase/Showcase';
import Movie from '../Movie/Movie';
import LoginContext from '../Login/LoginContext';


class Movies extends Component {
  state = { movies: [], loading: false, error: false }
  async componentDidMount() {
    this.setState({ loading: true })
    try {
      const results = await this.props.findMovies()
      this.setState({ movies: results })
    } catch (error) {
      this.setState({ error: true })
    } finally {
      this.setState({ loading: false })
    }
  }
  render() {
    const { loading, error } = this.state
    if (error) {
      return <p>Error 500!</p>
    }
    if (loading) {
      return <p>Loading...</p>
    }

    return (
      <LoginContext.Consumer>
        {
          ({ logged , movies}) =>
            logged
              ? 
              <>
              <div className="movies__showcase">
              <Showcase  keyFn={movie => movie.id} items={movies} render={movie =>
                  <Link to={`/details/${movie.id}`}>
                    <Movie details={movie} />
                  </Link>
                } />
              </div>
              </>
              : <Redirect to='/login' />
        }
      </LoginContext.Consumer>
    );
  }
}

export default props =>
  <LoginContext.Consumer>
    {
    ({ findMovies }) =>
      <Movies findMovies= {findMovies}/>
    }         
  </LoginContext.Consumer>
