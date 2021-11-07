import { ApolloError } from "@apollo/client";

export interface IGenericData {
  code: string;
  name: string;
}

export interface IContinentsData {
  continents: Array<IGenericData>;
}

export interface ICountriesData {
  countries: Array<IGenericData>;
}

export interface ICurrencyData {
  currency: string;
}

export interface ICurrenciesQuery {
  countries: Array<ICurrencyData>;
}

export interface ICountriesQueryParams {
  currency: string | undefined;
  continents: string[] | undefined;
}

export interface IGenericOutput<T> {
  loading: boolean;
  data: T;
  error: ApolloError | undefined;
}

export interface ICountryData {
  country:
    | {
        code: string;
        name: string;
        currency: string;
        continent: { name: string };
        languages: Array<{ name: string }>;
        capital: string;
      }
    | undefined;
}
