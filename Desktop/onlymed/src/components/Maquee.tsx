import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import delivery from "../assets/delivery.png";
import rating from "../assets/rating.png";
import staff from "../assets/staff.png";
import truck from "../assets/truck.png"; 
import visit from "../assets/visit.png";
import nigeria from "../assets/nigeria.png";

export const Maquee = () => {
  const features = [
    { icon: rating, text: "5-star reviews" },
    { icon: nigeria, text: "Made in Nigeria" },
    { icon: truck, text: "World-wide shipping" },
    { icon: staff, text: "500+ Verified Practitioners" },
    { icon: visit, text: "24/7 Medical Support" },
    { icon: delivery, text: "Same-Day Delivery"},
    { icon: rating, text: "5-star reviews" },
    { icon: truck, text: "World-wide shipping"}
  ];

  return (
    <div className='w-full bg-white py-2! sm:pt-4! overflow-hidden border-y border-gray-100'>
      <Swiper
        modules={[Autoplay]}
        spaceBetween={20}
        slidesPerView={'auto'}
        loop={true}
        speed={3000}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
        }}
        freeMode={true}
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 8,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 15,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          1280: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
        }}
        className="marquee-swiper"
      >
        {features.map((feature, index) => {
         
          return (
            <SwiperSlide key={index}>
              <div className='flex items-center flex-row justify-center gap-2! py-4! '>
                <img src={feature.icon} alt={feature.text} className='text-[#2987F3] w-[24px] h-[24px] text-lg'/>
                <span className='text-xs font-medium text-gray-600 tracking-wider uppercase whitespace-nowrap'>
                  {feature.text}
                </span>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  )
}
