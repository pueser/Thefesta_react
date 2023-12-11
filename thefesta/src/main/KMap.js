import { useState } from 'react';
import { Map, MapMarker, MarkerClusterer } from 'react-kakao-maps-sdk';
import { useEffect, useRef } from 'react';
import axios from 'axios';

function KMap() {
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    getApi();
    // setPositions(clusterPositionsData.positions);
  }, [])

  const getApi = (key) => {
    axios.get("/festival/list", {
      params: {
        pageNum: 1,
        amount: 9,
        keyword: key || (key ? key : ''),
      },
    })
      .then((res) => { 
        console.log("getApi res.data", res.data) 
        console.log("getApi res.data.list", res.data.list[0].mapx) 
        setPositions(res.data.list)
      })
      .catch((error) => { console.log("error", error) })
  }

  return (
    <Map // 지도를 표시할 Container
      center={{
        // 지도의 중심좌표
        lat: 36.2683,
        lng: 127.6358,
      }}
      style={{
        // 지도의 크기
        width: "60%",
        height: "450px",
      }}
      level={14} // 지도의 확대 레벨
    >
      <MarkerClusterer
        averageCenter={true} // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
        minLevel={10} // 클러스터 할 최소 지도 레벨
      >
        {positions.map((pos) => (
          <MapMarker
            key={`${pos.mapy}-${pos.mapx}`}
            position={{
              lat: pos.mapy,
              lng: pos.mapx,
            }}
          />
        ))}
      </MarkerClusterer>
    </Map>
  );
}
export default KMap;