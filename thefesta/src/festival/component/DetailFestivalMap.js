import { Map, MapMarker, ZoomControl } from 'react-kakao-maps-sdk';

function DetailFestivalMap({ mapx, mapy }) {
  console.log('DetailFestivalMap mapx', mapx);
  console.log('DetailFestivalMap mapy', mapy);

  if (mapx === undefined || mapy === undefined) {
    return null;
  }

  return (
    <Map // 지도를 표시할 Container
      center={{
        // 지도의 중심좌표
        lat: mapy,
        lng: mapx,
      }}
      style={{
        // 지도의 크기
        width: '100%',
        height: '450px',
      }}
      level={3} // 지도의 확대 레벨
    >
      <ZoomControl />
      <MapMarker // 마커를 생성합니다
        position={{
          // 마커가 표시될 위치입니다
          lat: mapy,
          lng: mapx,
        }}
      />
    </Map>
  );
}

export default DetailFestivalMap;
