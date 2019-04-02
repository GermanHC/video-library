import React from 'react'

import RateFilm from '../RateFilm/RateFilm'
import Movie from '../Movie/Movie'
import './Details.css'

class Details extends React.Component {
    state = {
        id: this.props.match.params.id,
        movies: JSON.parse(localStorage.getItem('movies')) || [],
        moviesSearch: JSON.parse(localStorage.getItem('moviesSearch')) || [],
        genres: localStorage.getItem('genres') !== "undefined" ? JSON.parse(localStorage.getItem('genres')) : []
    }
    
    onStarClickHalfStar(nextValue, prevValue, name, e) {
            const xPos = (e.pageX - e.currentTarget.getBoundingClientRect().left) / e.currentTarget.offsetWidth;
        
            if (xPos <= 0.5) {
              nextValue -= 0.5;
            }
        
           this.setState({rating_half_star: nextValue});
    }
    
    render() {
        
        const movie = (this.state.movies && this.state.movies.find(mov =>
            mov.id ===  Number(this.state.id))) || ((this.state.moviesSearch && this.state.moviesSearch.find(mov =>
                mov.id ===  Number(this.state.id)))
        )

        const rateDetails = {
            rateDB: movie.vote_average / 2,
            myRating: this.state.rating_half_star 
            }  

    return(
           <div className='details__film'>
                <Movie className='details__movie' details={movie} /> 
                <div className="meta__movie">
                    <h3>{movie.title}</h3>
                    <ul className="details__sub-title">
                        <li className="details__sub-title_item">{ new Date(movie.release_date).getFullYear()}</li>
                        {
                            movie.genre_ids.map((genre, i) => 
                                <li className="details__sub-title_item">
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
                        <em>Rating</em> {movie.vote_average} 
                        <RateFilm details={ rateDetails } onStarClick={this.onStarClickHalfStar.bind(this)} ></RateFilm>
                    </div>
                </div>
           </div>  
      )
    }
}

export default Details