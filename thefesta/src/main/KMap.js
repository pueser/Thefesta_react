import { useState } from 'react';
import { Map, MapMarker, MarkerClusterer, ZoomControl, useMap } from 'react-kakao-maps-sdk';
import { useEffect, useRef } from 'react';
import axios from 'axios';

function KMap() {
  const [positions, setPositions] = useState([]);
  const [level, setLevel] = useState();

  useEffect(() => {
    getApi();
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
        setPositions(res.data.list)
      })
      .catch((error) => { console.log("error", error) })
  }

  const EventMarkerContainer = ({ mapy, mapx, title }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <MapMarker
      position={{
        // 인포윈도우가 표시될 위치입니다
        lat: mapy,
        lng: mapx,
      }}
      clickable={true} // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정합니다
      onClick={() => setIsOpen(true)}
      >
        {isOpen && (
          <div style={{ minWidth: "150px" }}>
            <img
              alt="close"
              width="14"
              height="13"
              src="https://t1.daumcdn.net/localimg/localimages/07/mapjsapi/2x/bt_close.gif"
              style={{
                position: "absolute",
                right: "5px",
                top: "5px",
                cursor: "pointer",
              }}
              onClick={() => setIsOpen(false)}
            />
            <div style={{ padding: "5px", color: "#000", fontSize: "14px", width: "100%", marginRight: "16px"}}>{title}</div>
          </div>
        )}
      </MapMarker>
    )
  }

  return (
    <Map // 지도를 표시할 Container
    className='map'
      center={{
        // 지도의 중심좌표
        lat: 33.450701,
        lng: 126.570667,
      }}
      style={{
        // 지도의 크기
        width: "60%",
        height: "450px",
      }}
      level={14} // 지도의 확대 레벨
      onZoomChanged={(map) => setLevel(map.getLevel())}
    >
      <ZoomControl/>
      <MarkerClusterer
        averageCenter={true} // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
        minLevel={10} // 클러스터 할 최소 지도 레벨
      >
        {positions.map((pos) => (
          <EventMarkerContainer
            key={`EventMarkerContainer-${pos.mapy}-${pos.mapx}`}
            mapy={pos.mapy}
            mapx={pos.mapx}
            title={pos.title}
          />
        ))}
      </MarkerClusterer>
    </Map>
  );
}
export default KMap;