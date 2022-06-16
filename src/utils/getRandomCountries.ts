import { CountryI } from "../components/Countries";

export const getRandomCountries = (countries: CountryI[]) => {
  let randomCountries: CountryI[] = [];
  let randomCountry;

  for (let i = 0; i < 10; i++) {
    randomCountry = countries[Math.floor(Math.random() * countries.length)];
    randomCountries.push(randomCountry);
  }
  return randomCountries;
};
