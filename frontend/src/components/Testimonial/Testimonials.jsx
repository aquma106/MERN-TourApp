import React from "react";
import Slider from "react-slick";
import user from "../../assets/images/user.png";

const Testimonials = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 1000,
    swipeToSlide: true,
    autoplaySpeed: 2000,
    slidesToShow: 3,

    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slideToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slideToScroll: 1,
        },
      },
    ],
  };
  return (
    <Slider {...settings}>
      <div className="testimonial py-4 px-3">
        <p>
          The journey we traveled was good, our experience was also good. The
          seats in the vehicle were very comfortable to enjoy the journey.
        </p>
        <div className="d-flex align-items-center gap-4 mt-3">
          <img src={user} className="w-25 h-25 rounded-2" alt="" />
          <div>
            <h5 className="mb-0 mt-3">Hemraj</h5>
            <p>Customer</p>
          </div>
        </div>
      </div>
      <div className="testimonial py-4 px-3">
        <p>
          The price of the journey we traveled was well suited and in low cost
          it offers best services. The experience with the organization was very
          good.
        </p>
        <div className="d-flex align-items-center gap-4 mt-3">
          <img src={user} className="w-25 h-25 rounded-2" alt="" />
          <div>
            <h5 className="mb-0 mt-3">Hardik</h5>
            <p>Customer</p>
          </div>
        </div>
      </div>
      <div className="testimonial py-4 px-3">
        <p>
          It was very fun with all the passangers to enjoy the journey and it
          was most beautiful journey of my life. I hope that i will come again
          to enjoy this wonderfull experience.
        </p>
        <div className="d-flex align-items-center gap-4 mt-3">
          <img src={user} className="w-25 h-25 rounded-2" alt="" />
          <div>
            <h5 className="mb-0 mt-3">Rajat</h5>
            <p>Customer</p>
          </div>
        </div>
      </div>
    </Slider>
  );
};

export default Testimonials;
