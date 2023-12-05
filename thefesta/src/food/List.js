import React, { useEffect, useState } from 'react';
import { json } from 'react-router-dom';
import Food from './components/Food';
import './List.css';

function List({ contentid }) {
    const id = contentid;
    // console.log('id', id);
    const [foods, setFoods] = useState([]);
    // console.log(foods);
    const [areacode, setAreacode] = useState("");
    // console.log(areacode);
    const [showMoreFoods, setShowMoreFoods] = useState(
        localStorage.getItem('showMoreFoods') === 'true' || false
    );

    // 음식점 목록 가져오기
    const getFoods = async () => {
        try {
            const response = await fetch(`/food/list?contentid=${id}`);
            if (!response.ok) {
                throw new Error(`HTTP 오류 상태: ${response.status}`);
            }
            const data = await response.json();
            // console.log(data);

            setFoods(data.recommendDTOList);
            setAreacode(data.areacodeDTO)
        } catch (error) {
            console.error("데이터 가져오기 오류: ", error);
        }
    }

    useEffect(() => {
        getFoods();
    }, []);

    useEffect(() => {
        localStorage.setItem('showMoreFoods', showMoreFoods);
    }, [showMoreFoods]);

    useEffect(() => {
        const handleBeforeUnload = () => {
            // 페이지를 떠날 때 상태를 초기화
            setShowMoreFoods(false);
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);


    return (
        <section className="List-container">
            <div className="List-foods">
                <div className='List-food-container-top'>
                    <h1 className='List-food-title'>축제와 함께 즐기는 {areacode.sname} 맛집</h1>
                    <button
                        className='List-food-button'
                        onClick={() => setShowMoreFoods(!showMoreFoods)}
                        title={showMoreFoods ? "숨기기" : "더보기"}
                    >
                        {showMoreFoods ? "▲" : "▼"}
                    </button>
                </div>
                <div className="List-food-container-bottom">
                    {foods.slice(0, showMoreFoods ? foods.length : 3).map((food) => (
                        <Food
                            key={food.contentid}
                            contentid={food.contentid}
                            title={food.title}
                            addr1={food.addr1}
                            firstimage2={food.firstimage2}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default List;