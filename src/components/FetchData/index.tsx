/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { formatDateToText } from "../../helpers";
import { currencies } from "./currencies";

type FetchDataProps = {
  amount: number;
};

export interface RetrievedDataProps {
  amount: number;
  base: string;
  date: string;
  rates: Rates;
}

export interface Rates {
  USD: number;
}

const FetchData = ({ amount }: FetchDataProps) => {
  const [exchangeRate, setExchangeRate] = useState<RetrievedDataProps>({
    amount: 0,
    base: "AUD",
    date: "",
    rates: {
      USD: 0,
    },
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [inputValue, setInputValue] = useState<number>(amount);
  const [sourceCurrency, setSourceCurrency] = useState<string>("AUD");

  const fetchData = async () => {
    try {
      const host = "api.frankfurter.app";
      const response = await fetch(
        `https://${host}/latest?amount=${inputValue}&from=${sourceCurrency}&to=USD`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
      const data = await response.json();
      setExchangeRate(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle errors here
    } finally {
      setLoading(false);
    }
  };

  const arrCurrencies = Object.keys(currencies);

  const handleButtonClick = () => {
    // Call fetchData function passing the input value and selected currency
    fetchData();
  };

  useEffect(() => {
    setLoading(true);
    fetchData();
  }, []);

  return (
    <>
      <div className="mx-auto container">
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">
            $
          </span>
          <input
            type="number"
            className="form-control"
            placeholder="Enter USD"
            aria-label="USD Amount"
            aria-describedby="basic-addon1"
            value={inputValue}
            onChange={(e) => setInputValue(Number(e.target.value))}
          />
        </div>

        <div className="input-group mb-3">
          <select
            className="form-select"
            aria-label="Currency"
            value={sourceCurrency}
            onChange={(e) => setSourceCurrency(e.target.value)}
          >
            {arrCurrencies.map((elem, ind) => {
              return (
                <option key={ind} value={elem}>
                  {elem}
                </option>
              );
            })}
          </select>
          <button
            onClick={handleButtonClick}
            className="btn btn-outline-secondary"
            type="button"
          >
            Exchange it!
          </button>
        </div>
      </div>
      <div className="container px-4">
        {loading ? (
          <p className="text-warning lead">Loading...</p>
        ) : exchangeRate ? (
          <div className="container">
            <figure className="text-end">
              <blockquote className="blockquote">
                <p>{currencies[`${sourceCurrency}`]} to US Dollars</p>
              </blockquote>
              <figcaption className="blockquote-footer">
                Official Rate Exchange as to{" "}
                <cite title="Source Title">
                  {formatDateToText(exchangeRate.date)}
                </cite>
              </figcaption>
            </figure>

            <ul className="list-group">
              <li className="list-group-item d-flex justify-content-between align-items-center">
                Amount:
                <span className="badge bg-primary rounded-pill">
                  {exchangeRate.amount}
                </span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                Base:
                <span className="badge bg-primary rounded-pill">
                  {exchangeRate.base}
                </span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                Rate:
                <span className="badge bg-primary rounded-pill">
                  {exchangeRate.rates.USD}
                </span>
              </li>
            </ul>
          </div>
        ) : (
          <p>No data available</p>
        )}
      </div>
    </>
  );
};

export default FetchData;
