import React, { useState } from 'react';
import './SimpleSlider.css';
import defaultImageUrl from '../img/image_default.jpg';

const SimpleSlider = ({ images }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  // const defaultImageUrl = '../img/image_default.jpg';

  const goToPrevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? Math.min(images.length - 1, 9) : prevSlide - 1
    );
  };

  const goToNextSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === Math.min(images.length - 1, 9) ? 0 : prevSlide + 1
    );
  };

  return (
    <div className='simple-slider'>
      <div
        className='slider-container'
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {images &&
          images.slice(0, 10).map((img, index) => (
            <div
              key={index}
              className={`slide ${index === currentSlide ? 'active' : ''}`}
              style={{
                backgroundImage: `url(${img.originimgurl || defaultImageUrl})`,
              }}
            ></div>
          ))}
        {(!images || images.length === 0) && (
          <div
            className='slide default-slide'
            style={{ backgroundImage: `url(${defaultImageUrl})` }}
          ></div>
        )}
      </div>
      <div className='slider-dots'>
        {images &&
          images
            .slice(0, 10)
            .map((_, index) => (
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
          images && images.length <= 1 ? 'hidden' : ''
        }`}
      ></button>
      <button
        onClick={goToNextSlide}
        className={`slider-button next ${
          images && images.length <= 1 ? 'hidden' : ''
        }`}
      ></button>
    </div>
  );
};

export default SimpleSlider;
