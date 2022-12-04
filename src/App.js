import React, { useState, useRef } from 'react';
import { useEffect } from 'react';
import { Block } from './Block';
import json from './currency.json';
import './index.scss';

function App() {
  const ratesRef = useRef({});

  const [fromCurrency, setFromCurrency] = useState('RUB');
  const [toCurrency, setToCurrency] = useState('USD');
  const [fromPrici, setFromPrice] = useState(0);
  const [toPrice, setToPrice] = useState(1);



  //должна была быть ссылка но сайт больше не действителен и приглось заменить на локальный файл,
  //useEffect просто остался
  useEffect(() => {
    ratesRef.current = json.rates;
    onChangeToPrice(1)
  }, []);


  const onChangeFromPrice = (value) => {
    const price = value / ratesRef.current[fromCurrency];
    const result = price * ratesRef.current[toCurrency];
    setToPrice(result);
    setFromPrice(value)
  }

  const onChangeToPrice = (value) => {
    const price = value / ratesRef.current[toCurrency];
    const result = price * ratesRef.current[fromCurrency];
    setFromPrice(result)
    setToPrice(value)
  }

  useEffect(() => {
    onChangeFromPrice(fromPrici);
  }, [fromCurrency]);

  useEffect(() => {
    onChangeToPrice(toPrice)
  }, [toCurrency])


  return (
    <div className="App">
      <Block
        value={fromPrici}
        currency={fromCurrency}
        onChangeCurrency={setFromCurrency}
        onChangeValue={onChangeFromPrice}
      />
      <Block
        value={toPrice}
        currency={toCurrency}
        onChangeCurrency={setToCurrency}
        onChangeValue={onChangeToPrice}
      />
    </div>
  );
}

export default App;
