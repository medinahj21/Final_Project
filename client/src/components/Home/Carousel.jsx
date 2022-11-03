import { useRef, useState } from "react";

import FOTO2 from "../../images/carousel2.jpeg";
import FOTO3 from "../../images/carousel1.jpeg";
import FOTO1 from "../../images/carousel3.jpeg";
import FOTO5 from "../../images/carousel5.jpeg";

import "./Carousel.css";

const data = [
  {
    src: FOTO1,
    title: "Club Wolves - Voleyball",
  },
  {
    src: FOTO2,
    title: "Voley 2",
  },
  {
    src: FOTO5,
    title: "Voley 3",
  },
];

const Carousel = () => {
  const carousel = useRef();
  const [count, setCount] = useState(0);

  const incrementCarousel = (delta) => {
    if (!carousel.current) return;

    const width = carousel.current.offsetWidth;

    if (count + delta > data.length - 1) {
      setCount(0);
      carousel.current.scrollTo(0, 0);
      return;
    } else if (count + delta < 0) {
      setCount(data.length - 1);
      carousel.current.scrollTo(width * data.length - 1, 0);
      return;
    }

    carousel.current.scrollTo(carousel.current.scrollLeft + width * delta, 0);
    setCount((c) => c + delta);
  };

  return (
    <div className="carousel-container">
      <div
        className="carousel-btn left-btn"
        onClick={() => incrementCarousel(-1)}
      />
      <div
        className="carousel-btn right-btn"
        onClick={() => incrementCarousel(1)}
      />
      <div className="carousel" ref={carousel}>
        {data.map((img, idx) => (
          <div
            key={`${idx}-${img.title}`}
            className={idx === count ? "carousel-item active" : "carousel-item"}
          >
            <img src={img.src} alt="img of carousel" />
            <p>{img.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
