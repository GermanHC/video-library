import React from 'react';
import './Movie.css';

const rootURL =`${process.env.REACT_APP_INITIAL_LOCATION}`

const Movie = props => 
<div className="movie">
    <img className="movie__poster" src={rootURL + props.details.poster_path} alt={props.details.title} />
    <h1 className="movie__title" >{props.details.title}</h1>
</div>

export default Movie