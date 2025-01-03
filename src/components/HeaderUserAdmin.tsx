import Image from 'next/image'
import React from 'react'

export default function HeaderUserAdmin() {
  return (
    <section className='flex items-center gap-6'>
      <button 
        type='button' 
        className='w-10 h-10 border-[1px] border-border-option rounded-lg flex items-center justify-center'
        title='Settings'
      >
        <Image
          src='/header/notification.svg'
          alt='icon'
          className='h-6 w-6'
          height={32}
          width={32}
        />
      </button>
      <button 
        type='button' 
        className='w-10 h-10 border-[1px] border-border-option rounded-lg flex items-center justify-center'
        title='Settings'
      >
        <Image
          src='/header/settings.svg'
          alt='icon'
          className='h-6 w-6'
          height={32}
          width={32}
        />
      </button>
      <div className='bg-gray-400 h-12 w-12 rounded-full' />
    </section>
  )
}
