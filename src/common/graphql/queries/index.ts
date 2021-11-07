import { useQuery, gql, DocumentNode } from "@apollo/client";
import { ISelect } from "common/types";
import {
  IGenericData,
  IContinentsData,
  ICurrencyData,
  ICurrenciesQuery,
  ICountriesData,
  ICountriesQueryParams,
  IGenericOutput,
  ICountryData,
} from "common/graphql/types";

export const useContinents = (): IGenericOutput<ISelect[] | undefined> => {
  const CONTINENTS_QUERY = gql`
    query {
      continents {
        code
        name
      }
    }
  `;
  const { loading, data, error } = useQuery<IContinentsData>(CONTINENTS_QUERY);
  const normalizedData = data?.continents.map((continent: IGenericData) => {
    return { label: continent.name, value: continent.code } as ISelect;
  });

  return { loading, data: normalizedData, error };
};

export const useCurrencies = (): IGenericOutput<ISelect[] | undefined> => {
  const CURRENCIES_QUERY = gql`
    query {
      countries {
        currency
      }
    }
  `;

  const { loading, data, error } = useQuery<ICurrenciesQuery>(CURRENCIES_QUERY);
  const currencyList = data?.countries.reduce(
    (acc: string[], current: ICurrencyData) => {
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
  const normalizedData = currencyList?.map((currency: string) => {
    return { label: currency, value: currency } as ISelect;
  });

  return { loading, data: normalizedData, error };
};

export const useCountries = ({
  currency,
  continents,
}: ICountriesQueryParams): IGenericOutput<ISelect[] | undefined> => {
  const isCurrencyValid = currency && true;
  const areContinentsValid = continents && continents.length > 0;

  let countries_query: DocumentNode;
  if (isCurrencyValid && areContinentsValid) {
    countries_query = gql`
      query Countries($currency: String!, $continents: Array!) {
        countries(
          filter: {
            currency: { regex: $currency }
            continent: { in: $continents }
          }
        ) {
          code
          name
        }
      }
    `;
  } else if (isCurrencyValid) {
    countries_query = gql`
      query Countries($currency: String!) {
        countries(filter: { currency: { regex: $currency } }) {
          code
          name
        }
      }
    `;
  } else if (areContinentsValid) {
    countries_query = gql`
      query Countries($continents: [String]!) {
        countries(filter: { continent: { in: $continents } }) {
          code
          name
        }
      }
    `;
  } else {
    countries_query = gql`
      query {
        countries {
          code
          name
        }
      }
    `;
  }

  const countriesQuery = useQuery<ICountriesData>(countries_query, {
    variables: { currency, continents },
  });
  const normalizedData = countriesQuery.data?.countries.map(
    (country: IGenericData) => {
      return { label: country.name, value: country.code } as ISelect;
    }
  );

  return {
    loading: countriesQuery.loading,
    data: normalizedData,
    error: countriesQuery.error,
  };
};

export const useCountry = (
  code: string | undefined
): IGenericOutput<ICountryData | undefined> => {
  const COUNTRY_QUERY = gql`
    query Country($code: ID!) {
      country(code: $code) {
        code
        name
        currency
        continent {
          name
        }
        languages {
          name
        }
        capital
      }
    }
  `;

  const { loading, data, error } = useQuery<ICountryData>(COUNTRY_QUERY, {
    variables: { code },
  });

  return { loading, data, error };
};
