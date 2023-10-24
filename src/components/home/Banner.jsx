import React, { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, EffectCoverflow, Pagination, Autoplay } from 'swiper';
import { IoMdArrowRoundBack, IoMdArrowRoundForward } from "react-icons/io";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/swiper-bundle.css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/autoplay';


SwiperCore.use([Navigation, EffectCoverflow, Pagination]);

export const SlidingBanners = ({ images }) => {
    return (
        <div className='w-full flex justify-center'>
            <div className='overflow-hidden'>
                <Swiper
                    modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
                    autoplay={true}
                    centeredSlides={true}
                    loop={true}
                    slidesPerView={1} // Mostrar 2 banners en pantalla
                // spaceBetween={'2'} // Espacio entre los banners
                // autoHeight={true}
                >

                    {images.map((image, index) => (
                        <SwiperSlide key={index} className=''>
                            <div className='flex justify-center'>
                                <img src={image} alt='slide' className='pb-6 rounded-lg h-[600px]' />
                            </div>

                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};
