export interface IGenericElement {
  code: string;
  name: string;
}

export interface IContinentsQuery {
  continents: Array<IGenericElement>;
}

export interface ICountriesQuery {
  countries: Array<IGenericElement>;
}

export interface ICurrencyElement {
  currency: string;
}

export interface ICurrenciesQuery {
  countries: Array<ICurrencyElement>;
}

export interface ICountriesQueryParams {
  currency: string | undefined;
  continents: string[] | undefined;
}
