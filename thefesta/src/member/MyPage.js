import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import './MyPage.css';

function MyPage() {
//   const [imageUrl, setImageUrl] = useState("/1.jpg");
//   const fileInputRef = useRef(null);

//   const handleImageClick = () => {
//     // 클릭 시 파일 선택 창 열기
//     fileInputRef.current.click();
//   };

//   const handleFileChange = async (event) => {
//     const selectedFile = event.target.files[0];
    
//     // 파일 업로드
//     const formData = new FormData();
//     formData.append('id', 'testuser3@naver.com'); 
//     formData.append('file', selectedFile);

//     try {
//       const response = await axios.post('http://localhost:9090/member/updateImg', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       const updatedImageUrl = response.data; // 서버에서 받은 업데이트된 이미지 URL
//       console.log(updatedImageUrl);

//       // 이미지 URL 업데이트
//       setImageUrl(updatedImageUrl);
//     } catch (error) {
//       console.error('Error uploading image:', error);
//     }
//   };

//   return (
//     <div>
//       <img
//         src={`http://localhost:9090/thefestaTest${imageUrl}`}
//         alt="Profile Preview"
//         onClick={handleImageClick}
//         className='mypageimage'
//       />

//       <input
//         type="file"
//         ref={fileInputRef}
//         onChange={handleFileChange}
//         style={{ display: 'none' }}
//       />
//     </div>
//   );
// }

const imageName = '4.jpg';

  return (
    <div>
      <h1>Image Display</h1>
      <img
        src={`http://localhost:9090/images/${imageName}`}
        alt="Image"
        style={{ maxWidth: '100%', height: 'auto' }}
      />
    </div>
  );
};

export default MyPage;