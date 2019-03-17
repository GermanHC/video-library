import React from 'react';
import './Movie.css';

const rootURL =`${process.env.REACT_APP_INITIAL_LOCATION}`

export default props => 
<div className="movie">
    <img className="movie__poster" src={rootURL + props.details.poster} alt={props.details.title} />
    <h1 className="movie__title" >{props.details.title}</h1>
</div>