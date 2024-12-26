import Image from 'next/image'
import tiktok from '../assets/icons/tiktok.svg'

export function TiktokIcon () {
  return (
    <>
      <Image src={tiktok} alt="tiktok" className='p-1' />
    </>
  )
}
