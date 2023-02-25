import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import FuelQuoteForm from '../components/FuelQuoteForm.jsx'
import Link from 'next/link'
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
    <nav>
         <Link  href= "/profilemanag">
             Profile Management
         </Link>
    </nav>
    <nav>
         <Link  href= "/login">
             login
         </Link>
   </nav>
   
     <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
      </main>
   </>
  )
}
