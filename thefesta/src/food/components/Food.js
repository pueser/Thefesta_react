import React from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import './Food.css';

function Food({ contentid, title, addr1, firstimage2 }) {

    // title () 안의 내용 삭제
    if (title && title.includes('(')) {
        title = title.replace(/\([^)]*\)/, '').trim();
    }

    //firstimage2의 데이터 유무 확인
    const imageSource = firstimage2 ? firstimage2 : "/images/noimage.png";

    // title 글자 수에 따라 클래스네임 설정
    const titleClassName = title.length > 10 ? 'Food-title-long' : 'Food-title';

    return (
        <div className="Food">
            <Link to={`/food/detail/${contentid}`}>
                <img src={imageSource} title={title} alt={title} />
            </Link>
            <div className="Food-data">
                <h3 className={titleClassName}>
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