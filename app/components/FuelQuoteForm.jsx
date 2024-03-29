import styles from '../styles/Home.module.css'
import Image from 'next/image'
import localFont from '@next/font/local'
import { Inter } from '@next/font/google'
import { Combo, Roboto, Rubik } from '@next/font/google'
import FuelQuoteStyle from '../styles/FuelQuoteStyle.module.css'

var UsaStates = require('usa-states').UsaStates;
var usStates = new UsaStates();
var statesAbrev = usStates.arrayOf('abbreviations');

const roboto = Roboto({ 
    subsets: ['latin'], 
    weight: '400' 
})

var UsaStates = require('usa-states').UsaStates;
var usStates = new UsaStates();
var statesAbrev = usStates.arrayOf('abbreviations');

let pricePerGallon = 2.85

const FuelQuoteForm = () => {
    return(
          <div className={roboto.className}>
            <form className={FuelQuoteStyle.container}>
                <h2 className=" text-stone-700 font-semibold col-span-2 text-3xl text-center">The Current rate is <b>{pricePerGallon}</b></h2>

                <div className={FuelQuoteStyle.inputContainer}>
                    <div className={FuelQuoteStyle.logoInputContainer}>
                        <input type="date" className={FuelQuoteStyle.standardInputBox} placeholder={"Delivery Date"} name="delivery-date"/>
                    </div>
                </div>
                <div className={FuelQuoteStyle.splitContainer}>
                    <div className={FuelQuoteStyle.logoInputContainer}>
                        <input className={FuelQuoteStyle.standardInputBox} placeholder={"Gallons"} name="gallons-requested"/>
                        <Image src='/gallon.svg' width={28} height={28} className={FuelQuoteStyle.gallonLogo} alt="gallon"></Image>
                        <div className={FuelQuoteStyle.inputContainer}>
                            <buttton className={FuelQuoteStyle.calculateButton}>Calculate!</buttton>
                        </div>
                    </div>
                </div>
            </form>  
          </div>
    );
}

export default FuelQuoteForm;