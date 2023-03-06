import './App.css';
import { Block } from './components/Block'
import './index.css'
import {useEffect, useState} from "react";


function App() {
    const [fromCurrency, setFromCurrency] = useState('UAH')
    const [toCurrency, setToCurrency] = useState('USD')

    const [rates, setRates] = useState({})

    useEffect(() => {
        fetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json')
            .then((res) => res.json())
            .then((json) => {
                setRates(json)
                console.log(json[0].cc)
            })
            .catch((err) => {
                console.warn(err)
                alert('Не вдалося отримати інформацію')
            })

    }, [])

    return (
        <div className="App">
            <Block value={0} currency={fromCurrency} onChangeCurrency={setFromCurrency}/>
            <Block value={0} currency={toCurrency} onChangeCurrency={setToCurrency}/>
        </div>
    );
}

export default App;
