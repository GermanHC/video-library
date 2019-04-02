import React from 'react';
import './Collection.css';

const Collection = props => 
<div className="collection">
    <div className="collection__box">
        <h3 className="collection__name" >{props.details.name}</h3>
    </div>
</div>

export default Collection