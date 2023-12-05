import { useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import './Kakaomap.css';
// import add from '../images/add.svg';
// import remove from '../images/remove.svg';


function Kakaomap() {
    const [level, setLevel] = useState(13);
    const locations = [
        { title: '경기도', latlng: { lat: 37.5289145, lng: 127.1727772 } },
        { title: '강원도', latlng: { lat: 37.724962, lng: 128.3009629 } },
        { title: '충청북도', latlng: { lat: 36.7378449, lng: 127.8305242 } },
        { title: '충청남도', latlng: { lat: 36.5296003, lng: 126.8590621 } },
        { title: '전라북도', latlng: { lat: 35.7197198, lng: 127.1243977 } },
        { title: '전라남도', latlng: { lat: 34.9402001, lng: 126.9565003 } },
        { title: '경상북도', latlng: { lat: 36.3436011, lng: 128.7401566 } },
        { title: '경상남도', latlng: { lat: 35.369563, lng: 128.2570135 } },
    ];

    return (
        <div className='container'>
            <div className='searchbar'>
                <input type='search' id='search'></input>
            </div>
            <div className='kakaomap'>
                <Map
                    className='map'
                    center={{ lat: 37.5518911, lng: 126.9917937 }}
                    level={level}>
                    {/*  <div className='map_button'>
                    <button onClick={() => setLevel(level - 1)}>+</button>
                    <button onClick={() => setLevel(level + 1)}>-</button>
                </div> */}

                    {locations.map((loc, idx) => (
                        <MapMarker
                            key={`${loc.title}-${loc.latlng}`}
                            position={loc.latlng}
                            image={{
                                src: 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png',
                                size: { width: 24, height: 35 },
                            }}
                            title={loc.title}
                        />
                    ))}
                    <div className='map_button'>
                        <span onClick={() => setLevel(level - 1)}>
                            <img src="/images/add.svg" alt='확대' />
                        </span>
                        <span onClick={() => setLevel(level + 1)}>
                            <img src="/images/remove.svg" alt='축소' />
                        </span>
                    </div>
                </Map>
            </div>
        </div>
    )
}

export default Kakaomap;