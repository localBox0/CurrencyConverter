import React from 'react';

const defaultCurrencies = ['UAH', 'USD', 'EUR', 'GBP'];

export const Block = ({value, currency, onChangeValue, onChangeCurrency, listOfCurrency}) => (
    <div className="block">
        <ul className="currencies">
            {defaultCurrencies.map((cur) => (
                <li
                    onClick={() => onChangeCurrency(cur)}
                    className={currency === cur ? 'active' : ''}
                    key={cur}>
                    {cur}
                </li>
            ))}
            <li>
                <select className="additionalCur"
                        value={currency} onChange={(e) => onChangeCurrency(e.target.value)}>
                    {listOfCurrency.map((cur) => (
                        <option value={cur} key={cur}>
                            {cur}
                        </option>
                    ))}
                </select>
            </li>
        </ul>
        <input
            onChange={(e) => onChangeValue(e.target.value)}
            value={value}
            type="number"
            placeholder={0}
        />
    </div>
);