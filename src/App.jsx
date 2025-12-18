import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from "axios";


function App() {

  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [convertAmount, setConvertAmount] = useState(null);
  const [exchangeRate, SetExchangeRate] = useState(null);

  //  here when the value is 
  useEffect(() => {
    const changeExchangeRate = async () => {
      try {
        let url = (`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
        const response = await axios.get(url);

        SetExchangeRate(response.data.rates[toCurrency])

      }
      catch (error) {
        console.error(" Error fetching exchange rate :", error)
      }
    }
    changeExchangeRate()
  }, [fromCurrency, toCurrency]);

  // this is used to multiply the given amount value and currency value adn set in the variable of convert value 

  useEffect(() => {
    if (exchangeRate !== null) {
      setConvertAmount((amount * exchangeRate).toFixed(2))
    }
    console.log(convertAmount);

  }, [amount, exchangeRate])

  // ----------------------->

  // this is getting change the numebr into float value which is in percentage 

  const handleAmountChange = (e) => {
    const value = parseFloat(e.target.value)
    setAmount(isNaN(value) ? "" : value)
  }
  // -------->

  // here the value is to be triggered from currency 

  const handlefromcurrencychange = (e) => {
    setFromCurrency(e.target.value);
  }
  // -------->
  // here the value is to be triggered toocurrency 

  const handletocurrencychange = (e) => {
    setToCurrency(e.target.value)
  }


  return (
    <>
      <div className='currency-converter'>
        <div className="box"></div>
        <div className="data">
          <h1>Currency Converter</h1>
          <div className="input-container">
            <label htmlFor='amt'>Amount :</label>
            <input type='number' id='amt' value={amount} onChange={handleAmountChange} />
          </div>
          <div className="input-container">
            <label htmlFor='fromCurrency'> From Currency :</label>
            <select id='fromCurrency' value={fromCurrency} onChange={handlefromcurrencychange}>
              <option value="">-- Select Currency --</option>
              <option value="INR">Indian Rupee (₹)</option>
              <option value="USD">US Dollar ($)</option>
              <option value="EUR">Euro (€)</option>
              <option value="GBP">British Pound (£)</option>
              <option value="JPY">Japanese Yen (¥)</option>
              <option value="AUD">Australian Dollar (A$)</option>
              <option value="CAD">Canadian Dollar (C$)</option>
              <option value="CHF">Swiss Franc (CHF)</option>
              <option value="CNY">Chinese Yuan (¥)</option>
              <option value="SGD">Singapore Dollar (S$)</option> </select>
          </div>
          <div className="input-container">
            <label htmlFor='TOCurrency'> To Currency :</label>
            <select id='ToCurrency' value={toCurrency} onChange={handletocurrencychange}>
              <option value="">-- Select Currency --</option>
              <option value="INR">Indian Rupee (₹)</option>
              <option value="USD">US Dollar ($)</option>
              <option value="EUR">Euro (€)</option>
              <option value="GBP">British Pound (£)</option>
              <option value="JPY">Japanese Yen (¥)</option>
              <option value="AUD">Australian Dollar (A$)</option>
              <option value="CAD">Canadian Dollar (C$)</option>
              <option value="CHF">Swiss Franc (CHF)</option>
              <option value="CNY">Chinese Yuan (¥)</option>
              <option value="SGD">Singapore Dollar (S$)</option> </select>
          </div>
          {/* <button className='input-container'> Check Currency </button> */}
          <div className="result">
            <p> {amount} {fromCurrency} is equal to {convertAmount} {toCurrency} </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
