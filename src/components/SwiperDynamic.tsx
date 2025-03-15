'use client'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/swiper-bundle.css'
import Banner1 from '@/assets/banners/1.jpg'
import Banner2 from '@/assets/banners/2.jpg'
import Banner3 from '@/assets/banners/3.jpg'
import Banner4 from '@/assets/banners/4.jpg'

const BannerSwiper: string[] = [
  Banner1.src,
  Banner2.src,
  Banner3.src,
  Banner4.src,
]

export default function SwiperDynamic () {
  return (
    <div className='z-10'>
      <Swiper
        modules={[Autoplay]}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop={true}
        slidesPerView={1}
        spaceBetween={30}
      >
        {
          BannerSwiper.map((item, index) => (
            <SwiperSlide key={index}>
              <div>
                <img src={item} alt='banner' className='w-full h-auto' />
              </div>
            </SwiperSlide>
          ))
        }
      </Swiper>
    </div>
  )
}
