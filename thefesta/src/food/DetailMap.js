import React, { useEffect } from 'react';
import './DetailMap.css';

const DetailMap = ({ mapx, mapy }) => {
    useEffect(() => {
        if (mapx && mapy) {
            const floatMapX = parseFloat(mapx);
            const floatMapY = parseFloat(mapy);
            console.log('fmapx', mapx);
            console.log('fmapy', mapy);

            const { kakao } = window;

            const container = document.getElementById('map');
            const options = {
                center: new kakao.maps.LatLng(floatMapY, floatMapX),
                level: 2
            };

            const map = new kakao.maps.Map(container, options);

            const imageSrc = '/images/foodshop.png', // 마커이미지 주소    
                imageSize = new kakao.maps.Size(64, 69), // 마커이미지 크기
                imageOption = { offset: new kakao.maps.Point(27, 69) }; // 마커이미지 옵션(마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정)

            // 마커의 이미지정보를 가지고 있는 마커이미지를 생성
            const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption),
                markerPosition = new kakao.maps.LatLng(floatMapY, floatMapX); // 마커가 표시될 위치

            // 마커를 생성
            const marker = new kakao.maps.Marker({
                position: markerPosition,
                image: markerImage // 마커이미지 설정 
            });

            // 마커가 지도 위에 표시되도록 설정
            marker.setMap(map);
        }
    }, [mapx, mapy]);

    return (
        <div id="map"></div>
    );
};

export default DetailMap;