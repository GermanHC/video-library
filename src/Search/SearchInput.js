import React from 'react'

import './SearchInput.css'

const SearchInput = props => 
<div className="searchInput__header">
    <div className="searchInput__input">
        <input type="text" 
            className="searchInput__input_text"
            placeholder="Enter parameter to Search" 
            onChange={props.query}
            onKeyPress={props.onKeyPress}/>
    </div>
</div>

export default SearchInput