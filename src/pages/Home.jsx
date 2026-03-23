import React, { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

function Home() {
  const images = [
    "/images/slider.jpg",
    "/images/slider.jpg",
    "/images/slider.jpg",
  ];

  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [swiperInstance, setSwiperInstance] = useState(null);

  useEffect(() => {
    if (swiperInstance) {
      // Update navigation once refs are ready
      swiperInstance.params.navigation.prevEl = prevRef.current;
      swiperInstance.params.navigation.nextEl = nextRef.current;
      swiperInstance.navigation.destroy(); // reset navigation
      swiperInstance.navigation.init();    // re-initialize
      swiperInstance.navigation.update();
    }
  }, [swiperInstance]);

  return (
    <div style={{width: "100%", margin: "0 auto", position: "relative" }}>
      <Swiper
        
        modules={[Navigation]}
        loop={true}
        slidesPerView={1}
        onSwiper={(swiper) => setSwiperInstance(swiper)} // get Swiper instance
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <img
              src={img}
              alt={`Slide ${index + 1}`}
              style={{ width: "100%", display: "block" }}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Prev Button */}
      <div
        ref={prevRef}
        style={{
          position: "absolute",
          top: "50%",
          left: "10px",
          transform: "translateY(-50%)",
          cursor: "pointer",
          zIndex: 10,
        }}
      >
        <img src="/cursor_left.png" alt="Previous" width={30} />
      </div>

      {/* Custom Next Button */}
      <div
        ref={nextRef}
        style={{
          position: "absolute",
          top: "50%",
          right: "10px",
          transform: "translateY(-50%)",
          cursor: "pointer",
          zIndex: 10,
        }}
      >
        <img src="/cursor_right.png" alt="Next" width={30} />
      </div>
    </div>
  );
}

export default Home;