import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from './page.module.css'

// const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div className=' text-2xl text-rose-500'>
      Hello Airbnb!
    </div>
  )
}
