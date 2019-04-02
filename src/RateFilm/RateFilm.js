import React from 'react';
import StarRatingComponent from 'react-star-rating-component';

import './RateFilm.css';

const RateFilm = props => 
<div className="ratefilm" >
    <h3>From MovieDB:</h3>
    <div className="ratefilm__moviedb">
        <StarRatingComponent
        name="moviedb"
        editing={false}
        starCount={5}
        value={props.details.rateDB}  
        renderStarIcon={(index, value) => {
            return (
            <span>
                <i className={index <= value ? 'fas fa-star' : 'far fa-star'} />
            </span>
            );
        }}
        renderStarIconHalf={() => {
            return (
            <span>
                <span style={{position: 'absolute'}}><i className="far fa-star" /></span>
                <span><i className="fas fa-star-half" /></span>
            </span>
            );
        }} />
    </div>
 
    <h3>My Rate:</h3>
    <div className="ratefilm__myrate">
        <StarRatingComponent
        name="myrate"
        starColor="#ffb400"
        emptyStarColor="#ffb400"
        value={props.details.myRating}
        onStarClick = {props.onStarClick}
        renderStarIcon={(index, value) => {
            return (
            <span>
                <i className={index <= value ? 'fas fa-star' : 'far fa-star'} />
            </span>
            );
        }}
        renderStarIconHalf={() => {
            return (
            <span>
                <span style={{position: 'absolute'}}><i className="far fa-star" /></span>
                <span><i className="fas fa-star-half" /></span>
            </span>
            );
        }} />
    </div>
</div>
export default RateFilm