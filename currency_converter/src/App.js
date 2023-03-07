import './App.css';
import {Block} from './components/Block'
import './index.css'
import {useEffect, useState} from "react";
import axios from "axios";


function App() {
    const [fromCurrency, setFromCurrency] = useState('UAH')
    const [toCurrency, setToCurrency] = useState('USD')
    const [fromPrice, setFromPrice] = useState(0)
    const [toPrice, setToPrice] = useState(0)
    const [rates, setRates] = useState([])

    useEffect(() => {
        axios
            .get('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json')
            .then((res) => {
                const ratesObject = res.data.reduce((acc, {cc, rate}) => {
                    acc[cc.toString()] = rate
                    return acc
                }, {})
                const updatedRatesObject = Object.assign({}, ratesObject, {UAH: 1})
                setRates(updatedRatesObject)
            })
            .catch((err) => {
                console.warn(err)
                alert('Не вдалося отримати інформацію')
            })
    }, [])

    const onChangeFromPrice = (value) => {
        const rate = rates[fromCurrency] || 1; // Додано перевірку на наявність значення rates[fromCurrency]
        const price = value * rate;
        const result = isNaN(price) ? 0 : (price / rates[toCurrency]).toFixed(2); // Додано перевірку на NaN і встановлено 0 у разі виникнення помилки
        setToPrice(result);
        setFromPrice(value); // Додано перетворення на рядок
    }

    const onChangeToPrice = (value) => {
        const price = value * rates[fromCurrency];
        const result = (price / rates[toCurrency]).toFixed(2);
        setToPrice(result);

    }
    useEffect(() => {
        onChangeFromPrice(fromPrice)
    }, [fromCurrency])
    useEffect(() => {
        onChangeToPrice(fromPrice)
    }, [toCurrency])

    const currencies = Object.keys(rates)
    return (
        <div className="App">
            <Block listOfCurrency={currencies} value={fromPrice} currency={fromCurrency}
                   onChangeCurrency={setFromCurrency} onChangeValue={onChangeFromPrice}/>
            <Block listOfCurrency={currencies} value={toPrice} currency={toCurrency}
                   onChangeCurrency={setToCurrency} onChangeValue={onChangeToPrice}/>
        </div>
    );
}

export default App;
