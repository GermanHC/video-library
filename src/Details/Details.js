import React from 'react'

import RateFilm from '../RateFilm/RateFilm'
import Movie from '../Movie/Movie'
import './Details.css'
import LoginContext from '../Login/LoginContext';

class Details extends React.Component {
    state = {
        id: this.props.id,
        movies: this.props.movies,
        moviesSearch: this.props.moviesSearch,
        genres: this.props.genres,
        collections: this.props.collections,
        findFilmInCollection: this.props.findFilmInCollection,
        addFilmToCollection: this.props.addFilmToCollection,
        foundRated: {MovieId: this.props.id, Value: -1}
     }

     async componentDidMount() {
        this.setState({ loading: true })
        try {
            const params ={MovieId: this.state.id, Collection: "RatedCollection"}
            const results = await this.state.findFilmInCollection( params )
            if(results.Value !== -1){
                this.setState({ foundRated: results })
            }
            } catch (error) {
            this.setState({ error: true })
            } finally {
            this.setState({ loading: false })
            }
      }

    onStarClickHalfStar(nextValue, prevValue, name, e) {
        const xPos = (e.pageX - e.currentTarget.getBoundingClientRect().left) / e.currentTarget.offsetWidth;
        if (xPos <= 0.5) {
            nextValue -= 0.5;
        }
        const nextRate = {
            MovieId: this.state.foundRated.MovieId,
            Value: nextValue
        }
        this.updateRate(nextRate)
        
        this.setState({foundRated: nextValue});
    }
    
    async updateRate(nextRate) {
        const params ={MovieId: nextRate.MovieId, Collection: "RatedCollection", Value: nextRate.Value}
        void await this.state.addFilmToCollection(params)
    }

    render() {
        
        const movie = (this.state.movies && this.state.movies.find(mov =>
            mov.id ===  Number(this.state.id))) || ((this.state.moviesSearch && this.state.moviesSearch.find(mov =>
                mov.id ===  Number(this.state.id)))
        )
       
        const rateDetails = {
            rateDB: movie.vote_average / 2,
            myRating: this.state.foundRated.Value > 0 ? this.state.foundRated.Value : 0
        }  

    return(
           <div className='details__film'>
                <Movie className='details__movie' details={movie} /> 
                <div className="meta__movie">
                    <h3>{movie.title}</h3>
                    <ul className="details__sub-title">
                        <li>{ new Date(movie.release_date).getFullYear()}</li>
                        {
                            movie.genre_ids.map((genre, i) => 
                                <li key={genre}>
                                    {
                                      this.state.genres.find(obj => obj.id === genre).name + (i!==(movie.genre_ids.length-1) ? ',' : '.')
                                    }
                                </li>
                            )
                        }
                    </ul>
                    <br />
                    <div className="details__description">
                        <em>Movie</em> {movie.overview}	
                    </div>
                    <br />
                    <div className="details__rating">
                        <RateFilm details={ rateDetails } onStarClick={this.onStarClickHalfStar.bind(this)} ></RateFilm>
                    </div>
                </div>
           </div>  
        )
    }
}

export default props =>
    <LoginContext.Consumer>
      {
       ({movies, moviesSearch, genres, collections, findFilmInCollection, addFilmToCollection }) =>
        <Details 
            id={props.match.params.id} 
            movies= {movies}
            moviesSearch= {moviesSearch}
            findFilmInCollection= {findFilmInCollection}
            addFilmToCollection= {addFilmToCollection}
            collections= {collections}
            genres={genres}
        />
      }         
    </LoginContext.Consumer>