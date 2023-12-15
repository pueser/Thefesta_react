import React, { useState } from 'react';
import './SimpleSlider.css';
import defaultImageUrl from '../img/image_default.jpg';

const SimpleSlider = ({ images }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  // const defaultImageUrl = '../img/image_default.jpg';
  const imageArray = images || [];

  const goToPrevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? Math.min(imageArray.length - 1, 9) : prevSlide - 1
    );
  };

  const goToNextSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === Math.min(imageArray.length - 1, 9) ? 0 : prevSlide + 1
    );
  };

  return (
    <div className='simple-slider'>
      <div
        className='slider-container'
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {imageArray.slice(0, 10).map((img, index) => (
          <div
            key={index}
            className={`slide ${index === currentSlide ? 'active' : ''}`}
            style={{
              backgroundImage: `url(${img.originimgurl || defaultImageUrl})`,
            }}
          ></div>
        ))}
        {imageArray.length === 0 && (
          <div
            className='slide default-slide'
            style={{ backgroundImage: `url(${defaultImageUrl})` }}
          ></div>
        )}
      </div>
      <div className='slider-dots'>
        {imageArray.slice(0, 10).map((_, index) => (
          <div
            key={index}
            className={`dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => setCurrentSlide(index)}
          ></div>
        ))}
      </div>
      <button
        onClick={goToPrevSlide}
        className={`slider-button prev ${
          imageArray.length <= 1 ? 'hidden' : ''
        }`}
      ></button>
      <button
        onClick={goToNextSlide}
        className={`slider-button next ${
          imageArray.length <= 1 ? 'hidden' : ''
        }`}
      ></button>
    </div>
  );
};

export default SimpleSlider;
