import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom'

import './Collection.css'
import Showcase from '../Showcase/Showcase';
import Movie from '../Movie/Movie';
import LoginContext from '../Login/LoginContext';

class CollectionMovies extends Component {
    state = { collectionMovies: [], loading: false, error: false }
    async componentDidMount() {
      this.setState({ loading: true })
      try {
        const results = await this.props.findCollectionMovies(this.props.name)
        this.setState({ collectionMovies: results })
      } catch (error) {
        this.setState({ error: true })
      } finally {
        this.setState({ loading: false })
      }
    }
    render() {
      const {collectionMovies, loading, error } = this.state
      debugger
      if (error) {
        return <p>Error 500!</p>
      }
      if (loading) {
        return <p>Loading...</p>
      }
  
      return (
        <LoginContext.Consumer>
          {
            ({ logged }) =>
              logged
                ? 
                <>
                <div className="collectionMovies__showcase">
                <Showcase  keyFn={movie => movie.id} items={collectionMovies} render={movie =>
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
  ({ findCollectionMovies }) =>
    <CollectionMovies name={props.match.params.name} findCollectionMovies= {findCollectionMovies}/>
  }         
</LoginContext.Consumer>