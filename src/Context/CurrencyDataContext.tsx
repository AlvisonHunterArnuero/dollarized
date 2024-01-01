import { createContext, useCallback, useState } from "react";
import {
  CurrencyDataContextProps,
  CurrencyDataProviderProps,
  RetrievedDataProps,
} from "../customTypes";

export const CurrencyDataContext = createContext<CurrencyDataContextProps>({
  fetchCurrencyExchange: () => { },
  exchangeRate: {
    amount: 0,
    base: "AUD",
    date: "",
    rates: {
      USD: 0,
    },
  },
  sourceCurrency: "",
  fetchError: "",
  setExchangeRate: () => { },
  setSourceCurrency: () => { },
  setFetchError: () => { },
  currentAmount: 30,
  setCurrentAmount: () => { },
});
const CurrencyDataProvider = ({ children }: CurrencyDataProviderProps) => {
  const [exchangeRate, setExchangeRate] = useState<RetrievedDataProps>({
    amount: 0,
    base: "AUD",
    date: "",
    rates: {
      USD: 0,
    },
  });

  const [sourceCurrency, setSourceCurrency] = useState<string>("AUD");
  const [fetchError, setFetchError] = useState<string>("");
  const [currentAmount, setCurrentAmount] = useState<number>(30);


  /**
   * Fetches currency exchange data asynchronously.
   * @async
   * @function fetchCurrencyExchange
   * @returns {Promise<void>} A promise that resolves once the currency exchange data is fetched.
   */
  const fetchCurrencyExchange = useCallback(async () => {
    try {
      const host = "api.frankfurter.app";
      const apiUrl = `https://${host}/latest?amount=${currentAmount}&from=${sourceCurrency}&to=USD`;
      const response = await fetch(
        apiUrl
      );
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
      const data = await response.json();
      setExchangeRate(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setFetchError("An unexpected error occurred while fetching the data!");
    }
  }, [currentAmount, sourceCurrency]);

  return (
    <CurrencyDataContext.Provider
      value={{
        fetchCurrencyExchange,
        exchangeRate,
        sourceCurrency,
        fetchError,
        setExchangeRate,
        setSourceCurrency,
        setFetchError,
        currentAmount,
        setCurrentAmount,
      }}
    >
      {children}
    </CurrencyDataContext.Provider>
  );
};

export default CurrencyDataProvider;