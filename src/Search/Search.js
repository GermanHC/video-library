import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom'

import './Search.css';
import Showcase from '../Showcase/Showcase';
import Movie from '../Movie/Movie';
import LoginContext from '../Login/LoginContext';
import SearchInput from './SearchInput';

class Search extends Component {
    state = { moviesSearch: [], 
        loading: false, 
        error: false }
    
    async handleKeyPress(e){
        if (e.key === 'Enter') {
            this.setState({ loading: true })
            try {
              void await this.props.findMovieByQuery(e.target.value)
            } catch (error) {
              this.setState({ error: true })
              this.setState({ loading: false })
            } 
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
            ({ logged , moviesSearch}) =>
              logged
                ? 
                <>
                <div className="search__form"  >
                    <SearchInput className="search__box" onKeyPress={this.handleKeyPress.bind(this)}> 
                    </SearchInput>
                    <Showcase keyFn={movie => movie.id} items={moviesSearch} render={movie =>
                        <Link to={`/details/${movie.id}`}>
                        <Movie details={movie} />
                        </Link>
                    } 
                    />
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
      ({ findMovieByQuery }) =>
        <Search findMovieByQuery= {findMovieByQuery}/>
      }         
    </LoginContext.Consumer>