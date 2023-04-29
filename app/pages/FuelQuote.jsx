import Head from 'next/head'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import FuelQuoteForm from '../components/FuelQuoteForm.jsx'
import { Inter } from '@next/font/google'
import { Combo, Roboto, Rubik } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import localFont from '@next/font/local'
import { TypeAnimation } from 'react-type-animation';
import Client from '../__models/client.js'
import { useSession } from 'next-auth/react'
import axios from 'axios'

const satoshi = localFont({
  src: '../fonts/Satoshi-Regular.otf',
  weight: '200'
})


export default function FuelQuote() {
  const { data: session, status } = useSession();

  const [selectDate, setSelectedDate] = useState('')
  const [selectGallons, setSelectedGallons] = useState('')

  const [pricePerGallon, setPricePerGallon] = useState('1.50')
  const [suggestedGallons, setSuggestedGallons] = useState('1.50')
  const [totalPrice, setTotalPrice] = useState('0.00')
  const [deliveryError, setDeliveryError] = useState('');
  const today = new Date();
  const router = useRouter();
  
  function setButtonActivity(_selectDate, _selectGallons){
    if(_selectDate === '' || _selectGallons === '')
        return(
          <span>     
            <button 
              className=" bg-stone-300 text-stone-500 text-center col-span-1 font-semibold h-12 mt-2 w-full p-2 py-3 border-transparent rounded-xl hover:cursor-pointer flex flex-row items-center justify-center" onClick={handleFormSubmit}
            >
              {"Get Quote!"}
            </button>
            <button 
              className=" bg-stone-300 text-stone-500 text-center col-span-1 font-semibold h-12 mt-2 w-full p-2 py-3 border-transparent rounded-xl hover:cursor-pointer flex flex-row items-center justify-center gap-x-1" onClick={handleQuoteSubmit}
            >
              {"Submit"}
            </button> 
          </span>
        );
    else
        return(
          <span>     
            <button 
              className="bg-stone-300 text-stone-500 text-center col-span-1 font-semibold h-12 mt-2 w-full p-2 py-3 border-transparent rounded-xl hover:bg-stone-400 hover:text-stone-600 hover:cursor-pointer flex flex-row items-center justify-center" onClick={handleFormSubmit}
            >
              {"Get Quote!"}
            </button>
            <button 
              className="bg-stone-300 text-stone-500 text-center col-span-1 font-semibold h-12 mt-2 w-full p-2 py-3 border-transparent rounded-xl hover:bg-stone-400 hover:text-stone-600 hover:cursor-pointer flex flex-row items-center justify-center gap-x-1" onClick={handleQuoteSubmit}
            >
              {"Submit"}
            </button> 
          </span>
        );
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setDeliveryError("");
    const selectedDate = new Date(selectDate)
    if (selectDate === "mm/dd/yyy" || selectGallons === "")
      return;
      if(selectedDate < today){
        console.log("past");
        setDeliveryError("Incorrect date");
        return;
      }
  
      console.log(today);
      console.log("here");
      console.log(selectedDate);
    const response = await fetch(
      `http://localhost:3000/api/calculateQuote?deliveryDate=${selectDate}&gallonsRequested=${selectGallons}`,
      {
        method: "GET",
      }
    )
  
    const pricingData = await response.json()
    setPricePerGallon(pricingData.pricePerGallon)
    setSuggestedGallons(pricingData.suggestedPrice)
    setTotalPrice(pricingData.totalAmount)
  };

  const handleQuoteSubmit = async (event) => {
    event.preventDefault();

    const _deliveryDate = new Date(selectDate)

    //We can change these edge cases later and make them message the user on the screen (maybe with TypeAnimations but idk ab that because they're memoized and can only change when the page refreshs)
    if(!_deliveryDate || selectGallons === "" || totalPrice === "0.00")
      return

    
    const historyData = {
      email: session.user.email,
      deliveryDate: _deliveryDate,
      gallonsRequested: selectGallons,
      pricePerGallon: suggestedGallons,
      totalAmount: totalPrice,
    }

    console.log(historyData.pricePerGallon  )

    const response = await fetch(
      `http://localhost:3000/api/calculateQuote`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(historyData),
      });

    const data = await response.json()
    console.log(data)
    router.push('/History')
  }

  return (
    <>
      <Head>
        <title>Fill Your Fuel Quote Form</title>
        <meta name="description" content="Generated by create next app"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel="icon" href="/pipeline.svg"/>
      </Head>
      <main className={styles.main}>
        <div className={satoshi.className}>
              <h2 className='text-stone-100 text-3xl font-semibold mb-2 ml-3'>
                {"Make a Fuel Quote:"}
              </h2>            
            <form 
              className= "bg-stone-100 bg-opacity-20 grid grid-cols-2 grid-rows-2 gap-y-1 rounded-3xl m-auto pb-11 pt-10 px-5 text-sm w-[30rem]" 
             // onSubmit={handleFormSubmit1}
            >
              <div className="col-span-2 h-28">
                <h2 className="text-stone-100 font-semibold col-span-1 text-lg text-left mx-5">
                    <TypeAnimation
                        className=""
                        sequence={[
                          `Welcome, please take note of our policy:`,
                          3200,
                        ]} 
                        cursor={true}
                        repeat={false}
                        speed={25}
                        deletionSpeed={25}
                      />                
                  </h2>
                  <h2 className="text-stone-100 font-light col-span-1 text-sm text-left mx-5 w-full">
                    <TypeAnimation
                        className=""
                        sequence={[
                          `Location factor policy:\nClients from Texas\n are charged a 2% location factor.\nWhile out of state clients will be charged 4%.`,
                          3200,
                        ]} 
                        cursor={true}
                        repeat={false}
                        speed={25}
                        deletionSpeed={25}
                      />                
                  </h2>
              </div>
              <div>
                <h3 className="text-white font-base font-semibold mx-5 pl-1 pb-1.5">Delivery Date</h3>
                <input type="date" className="h-12 mx-5 w-10/12 p-2 py-2 border-transparent rounded-xl font-medium text-stone-400" placeholder={"Delivery Date"} name="delivery-date" onChange={(event) => setSelectedDate(event.target.value)}/>
              </div> 
              {deliveryError && <p className="text-red-500">{deliveryError}</p>}

              <div className="w-full">
                <h3 className="text-white font-base font-semibold mx-5 pl-1 pb-1.5">Amount of gallons</h3>
                <Image src='/gallon.svg' width={18} height={18} className="absolute ml-40 mt-3.5" alt="gallon"></Image>
                <input className="h-12 mx-5 w-10/12 p-2 py-2 border-transparent rounded-xl font-medium text-stone-400" placeholder={"Gallons"} name="gallons-requested" onChange={(event) => setSelectedGallons(event.target.value)}/>
              </div>

              <div className="w-full col-span-1">
                <h2 className="text-white font-medium text-sm mx-5 pl-1 pb-1.5">Suggested Price per Gallon</h2>
                <div className="h-12 mx-5 w-10/12 p-2 py-2 border-transparent rounded-xl font-medium bg-stone-100 text-cambridgeBlue text-right">
                  <p className="text-neutral-500 py-1.5 pr-3">
                      {`$${suggestedGallons}`}
                  </p>
                </div>
              </div>

              <div className="w-full col-span-1">
                <h2 className="text-white font-medium text-sm mx-5 pl-1 pb-1.5">Estimated Total Price:</h2>
                <div className="h-12 mx-5 w-10/12 p-2 py-2 rounded-xl font-medium bg-stone-100 text-cambridgeBlue text-right mb-2">
                  <p className="text-neutral-500 py-1.5 pr-3">
                    {`$${totalPrice}`}
                  </p>
                </div>
              </div>

              <div className= "col-span-2 mx-5 border-t-2 border-white border-inherit border-spacing-6 pt-2 mt-2 ">
                {setButtonActivity(selectDate, selectGallons)}
              </div>
             
            </form>
          </div>
      </main>
    </>
  )
}