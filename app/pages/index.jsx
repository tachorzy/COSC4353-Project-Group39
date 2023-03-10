import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import FuelQuoteForm from '../components/FuelQuoteForm.jsx'
import FuelQuoteHistory from '../components/FuelQuoteHistory.jsx'
import LoginButton from '../components/LoginButton.jsx'
import RegisterButton from '../components/RegisterButton.jsx'
import localFont from '@next/font/local'

const inter = Inter({ subsets: ['latin'] })

const satoshi = localFont({
  src: '../fonts/Satoshi-Regular.otf',
  weight: '200'
})

const satoshiBold = localFont({
  src: '../fonts/Satoshi-Bold.otf',
  weight: '200'
})

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
          <div className={satoshiBold.className}>
            <span className="font-semibold">
              <LoginButton/>
              <RegisterButton/>
            </span>
            <h1 className="text-9xl mt-24 mx-auto font-extrabold">Calculate your<br/>Fuel Quotes</h1>
          </div>
          
      </main>
    </>
  )
}
