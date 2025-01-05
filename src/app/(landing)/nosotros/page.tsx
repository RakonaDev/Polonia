import { InfiniteMovingCards } from '@/components/ui/infinite-moving-cards'
import React from 'react'

const socios = [
  {
    url: '/socios/image-2.png'
  },
  {
    url: '/socios/image-3.png'
  },
  {
    url: '/socios/image-4.png'
  },
  {
    url: '/socios/image-5.png'
  },
  {
    url: '/socios/image-6.png'
  },
  {
    url: '/socios/image-7.png'
  },
  {
    url: '/socios/image-8.png'
  },
  {
    url: '/socios/image-9.png'
  },
  {
    url: '/socios/image-10.png'
  },
  {
    url: '/socios/image-11.png'
  },
  {
    url: '/socios/image-12.png'
  }
]

export default async function NosotrosPage() {
  return (
    <>
      <div className='mt-20 bg-black w-full h-60'>
        <div className="h-[20rem] rounded-md flex flex-col antialiased bg-white dark:bg-[#130F26] dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
          <InfiniteMovingCards
            items={socios}
            direction="right"
            speed="fast"
          />
        </div>
      </div>
    </>
  )
}
