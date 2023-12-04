import React from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import './Food.css';

function Food({ contentid, title, addr1, firstimage2 }) {

    // title () 안의 내용 삭제
    if (title && title.includes('(')) {
        title = title.replace(/\([^)]*\)/, '').trim();
    }

    //firstimage2의 값 유무 확인
    const imageSource = firstimage2 ? firstimage2 : "/images/noimage.png";

    return (
        <div className="Food">
            <Link to={`/food/detail/${contentid}`}>
                <img src={imageSource} title={title} alt={title} />
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

Food.prototype = {
    contentid: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    addr1: PropTypes.string.isRequired,
    firstimage2: PropTypes.string,
}

export default Food;