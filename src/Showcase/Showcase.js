import React from "react";
import './Showcase.css';

const Showcase = props =>
<ul className='showcase'>
{
    props.items.map(item =>
        <li key={props.keyFn(item)} className='showcase__item'>
            {props.render(item)}
        </li>
        )
}
</ul>
export default Showcase;