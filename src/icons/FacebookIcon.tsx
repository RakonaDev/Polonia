import Image from 'next/image'
import face from '../assets/icons/facebook.svg'

export function FacebookIcon () {
  return (
    <>
      <Image src={face} alt="facebook" className='p-1'/>
    </>
  )
}
