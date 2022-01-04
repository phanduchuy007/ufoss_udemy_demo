import NextArrowButton from './Components/NextArrowButton';
import PrevArrowButton from './Components/PrevArrowButton';

const settings = {
  dots: false,
  infinite: false,
  lazyLoad: true,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 5,
  swipeToSlide: true,
  nextArrow: <NextArrowButton />,
  prevArrow: <PrevArrowButton />,
  responsive: [
    {
      breakpoint: 1280,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2.5,
        slidesToScroll: 2,
        prevArrow: false,
        nextArrow: false,
      },
    },
    {
      breakpoint: 448,
      settings: {
        slidesToShow: 1.5,
        slidesToScroll: 1,
        prevArrow: false,
        nextArrow: false,
      },
    },
  ],
};

export default settings;
