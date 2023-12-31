/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useState, useEffect } from "react";
import { formatDateToText } from "../../helpers";
import { currencies } from "./currencies";
import { CurrencyDataContext } from "../../Context/CurrencyDataContext";

const FetchData = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const { fetchCurrencyExchange,
    exchangeRate,
    sourceCurrency,
    setSourceCurrency,
    setCurrentAmount, currentAmount } =
    useContext(CurrencyDataContext);

  const arrCurrencies = Object.keys(currencies);

  const handleButtonClick = () => {
    if (fetchCurrencyExchange) {
      fetchCurrencyExchange();
    }
  };

  useEffect(() => {
    setLoading(true);
    if (fetchCurrencyExchange) {
      fetchCurrencyExchange();
      setLoading(false)
    }
  }, []);

  return (
    <div className="w-full container mx-auto">
      <div className="gap-6 max-w-full flex flex-wrap md:justify-normal justify-center">
        <div className="basis-5/6 md:basis-1/4">
          <label htmlFor="amount"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Currency Amount
          </label>
          <div className="flex">
            <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
              $
            </span>
            <input
              type="number"
              id="amount"
              aria-label="Currency Amount"
              value={currentAmount}
              onChange={(e) => setCurrentAmount(Number(e.target.value))}
              className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required />
          </div>
        </div>

        <div className="basis-5/6 md:basis-1/4">
          <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Select your country Currency
          </label>
          <select
            id="countries"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            aria-label="Currency"
            value={sourceCurrency}
            onChange={(e) => setSourceCurrency(e.target.value)}
          >
            {arrCurrencies.map((elem, ind) => {
              return (
                <option key={ind} value={elem}>
                  {elem} - {currencies[elem]}
                </option>
              );
            })}
          </select>
        </div>

        <div className="basis-5/6 md:basis-1/4">
          <label htmlFor="fetch" className="block md:mb-7 font-medium text-sm">
            {" "}
          </label>
          <button
            id="fetch"
            onClick={handleButtonClick}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            type="button"
          >
            Exchange it!
          </button>
        </div>
      </div>
      <div className="container">
        {loading ? (
          <p className="text-warning lead">Loading...</p>
        ) : exchangeRate ? (
          <div className="container">
            <div className="relative overflow-x-auto mt-4 md:rounded-md">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-300 text-center uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-300">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Amount
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Base
                    </th>
                    <th scope="col" className="px-6 py-3">
                      U$ Rate
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Last Updated On
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="row" className="px-6 py-4 font-medium dark:text-gray-400 text-center">
                      {exchangeRate.amount}
                    </th>
                    <td className="px-6 py-4 font-medium dark:text-gray-400 text-center">
                      {exchangeRate.base}
                    </td>
                    <td className="px-6 py-4 font-medium dark:text-gray-400 text-center">
                      {exchangeRate.rates.USD}
                    </td>
                    <td className="px-6 py-4 font-medium dark:text-gray-400 text-center">
                      {formatDateToText(exchangeRate.date)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="font-sans text-center ms:text-end my-4 text-gray-500 text-sm mx-2">
              <blockquote className="blockquote uppercase my-1 font-bold text-sky-500">
                <p>{currencies[`${sourceCurrency}`]} to US Dollars</p>
              </blockquote>
              <figcaption className="blockquote-footer text-green-200 text-xs">
                Official Rate Exchange as to{" "}
                <cite title="Source Title">
                  {formatDateToText(exchangeRate.date)}
                </cite>
              </figcaption>
            </div>
          </div>
        ) : (
          <p>No data available</p>
        )}
      </div>
    </div>
  );
};

export default FetchData;
