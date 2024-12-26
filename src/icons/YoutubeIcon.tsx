import Image from 'next/image'
import youtube from '../assets/icons/youtube.svg'

export function YoutubeIcon () {
  return (
    <>
      <Image src={youtube} alt="youtube" className='p-1'/>
    </>
  )
}