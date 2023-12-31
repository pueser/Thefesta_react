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

    // 상세 페이지 새 창에서 열기
    const handleFoodClick = () => {
        const detailedPageURL = `/food/detail/${contentid}`;
        window.open(detailedPageURL, '_blank');
    };

    return (
        <div className="Food" onClick={handleFoodClick}>
            <img src={imageSource} title={title} alt={title} />
            <div className="Food-data">
                <h3 className={titleClassName}>{title}</h3>
                <h5 className="Food-addr">{addr1}</h5>
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