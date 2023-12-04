import React from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import './Food.css';


function Food({ contentid, title, addr1, firstimage2 }) {

    return (
        <div className="Food">
            <Link to={`/food/detail/${contentid}`}>
                <img src={firstimage2} title={title} alt={title} />
            </Link>
            <div className="Food-data">
                <h3 className="Food-title">
                    <Link to={`/food/detail/${contentid}`}>{title}</Link>
                </h3>
                <h5 className="Food-addr"><Link to={`/food/detail/${contentid}`}>{addr1}</Link></h5>
            </div>

        </div>
    )
}

// git test

Food.prototype = {
    contentid: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    addr1: PropTypes.string.isRequired,
    firstimage2: PropTypes.string.isRequired
}

export default Food;