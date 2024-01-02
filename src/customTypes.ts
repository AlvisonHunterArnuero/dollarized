import { Dispatch, SetStateAction } from "react";

export type MovieInfoProps = {
  data: DataChildren[];
};
export type DataChildren = {
  title: string;
  year: string;
  imdbid: string;
  type: string;
  poster: string;
};
export interface CurrencyDataContextProps {
  fetchCurrencyExchange?: () => void;
  exchangeRate: RetrievedDataProps;
  sourceCurrency: string;
  fetchError: string;
  setExchangeRate: Dispatch<SetStateAction<RetrievedDataProps>>;
  setSourceCurrency: Dispatch<SetStateAction<string>>;
  setFetchError: Dispatch<SetStateAction<string>>;
  currentAmount: number,
  setCurrentAmount: Dispatch<SetStateAction<number>>;
}
export interface CurrencyDataProviderProps {
  children: JSX.Element | JSX.Element[];
}

export type ChangeEvent = React.ChangeEvent<HTMLInputElement>;
export type ButtonClickEvent = React.MouseEvent<HTMLButtonElement>;

export type ErrorAlertProps = {
  alertErrorMessage: string | null;
};

export type FetchDataProps = {
  amount: number;
};

export interface Rates {
  USD: number;
}

export interface RetrievedDataProps {
  amount: number;
  base: string;
  date: string;
  rates: Rates;
}

