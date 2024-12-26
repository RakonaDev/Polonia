import Image from 'next/image'
import insta from '../assets/icons/instagram.svg'

export function InstagramIcon () {
  return (
    <>
      <Image src={insta} alt="instagram" className='p-1'/>
    </>
  )
}
