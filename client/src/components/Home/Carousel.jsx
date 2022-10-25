import { useRef, useState } from "react";

import "./Carousel.css";

const data = [
  {
    src: "https://img.freepik.com/vector-gratis/silueta-voleibol-diseno-plano_23-2149400514.jpg?w=826&t=st=1666637407~exp=1666638007~hmac=c98428f04cd5789f6eb89041ebb6e5aa3740d5e69e21ec81e36a5a3a39c090c7",
    title: "Voley 1",
  },
  {
    src: "https://img.freepik.com/vector-gratis/silueta-voleibol-diseno-plano_23-2149400511.jpg?w=826&t=st=1666637407~exp=1666638007~hmac=ce3fceaede6eac5aee73693e9ecb7420eb38246d3d4b2c65c5893dfffeb82cbc",
    title: "Voley 2",
  },
  {
    src: "https://img.freepik.com/vector-gratis/silueta-voleibol-diseno-plano_23-2149400509.jpg?w=826&t=st=1666637408~exp=1666638008~hmac=ee59771ff0d93d2fba5056f046a0b0aa9c2a831167837d8f73e2ecf0cd9c997f",
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
