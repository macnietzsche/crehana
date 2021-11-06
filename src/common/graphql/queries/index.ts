import { useQuery, gql } from "@apollo/client";
import { ISelect } from "common/types";
import {
  IGenericElement,
  IContinentsQuery,
  ICurrencyElement,
  ICurrenciesQuery,
  ICountriesQuery,
  ICountriesQueryParams,
} from "common/graphql/types";

export const useContinents = (): ISelect[] | undefined => {
  const CONTINENTS_QUERY = gql`
    query {
      continents {
        code
        name
      }
    }
  `;
  const continentQuery = useQuery<IContinentsQuery>(CONTINENTS_QUERY);
  return continentQuery.data?.continents.map((continent: IGenericElement) => {
    return { label: continent.name, value: continent.code } as ISelect;
  });
};

export const useCurrencies = (): ISelect[] | undefined => {
  const CURRENCIES_QUERY = gql`
    query {
      countries {
        currency
      }
    }
  `;

  const currencyQuery = useQuery<ICurrenciesQuery>(CURRENCIES_QUERY);
  const currencyList = currencyQuery.data?.countries.reduce(
    (acc: string[], current: ICurrencyElement) => {
      if (current.currency) {
        const countryCurrencies: Array<string> = current.currency.split(",");
        const uniqueCurrencies = countryCurrencies.filter(
          (countryCurrency: string) => !acc.includes(countryCurrency)
        );
        acc.push(...uniqueCurrencies);
      }
      return acc;
    },
    []
  );
  return currencyList?.map((currency: string) => {
    return { label: currency, value: currency } as ISelect;
  });
};

export const useCountries = ({
  currency,
  continents,
}: ICountriesQueryParams): ISelect[] | undefined => {
  const filterCurrencies = currency ? `currency: {regex: "${currency}"}` : "";

  const filterContinents =
    continents && continents.length > 0
      ? `continent: {in: ${JSON.stringify(continents)}}`
      : "";

  const countries_query = gql`
    query {
      countries(filter: {${filterContinents} ${filterCurrencies}}) {
        code
        name
      }
    }
  `;
  const countriesQuery = useQuery<ICountriesQuery>(countries_query);
  return countriesQuery.data?.countries.map((country: IGenericElement) => {
    return { label: country.name, value: country.code } as ISelect;
  });
};
