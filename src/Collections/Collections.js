import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom'

import './Collections.css';
import Showcase from '../Showcase/Showcase';
import Collection from '../Collection/Collection';
import LoginContext from '../Login/LoginContext';

class Collections extends Component {
    state = { collections: [], loading: false, error: false }
    async componentDidMount() {
      this.setState({ loading: true })
      try {
        const results = await this.props.findCollections()
        this.setState({ collections: results })
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
            ({ logged , collections}) =>
              logged
                ? 
                <>
                <div className="collections__showcase">
                {
                    collections !== undefined && collections.length > 0
                    ? (
                    <ul className='posts'>
                    {
                    <Showcase  keyFn={collection => collection.name} items={collections} render={collection =>
                        <Link to={`/collectiondetails/${collection.name}`}>
                          <Collection details={collection} />
                        </Link>
                      } />
                    }
                    </ul>
                    )
                    : (
                    <p>There are no collections yet...</p>
                    )
                }
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
      ({ findCollections }) =>
        <Collections findCollections= {findCollections}/>
      }         
    </LoginContext.Consumer>