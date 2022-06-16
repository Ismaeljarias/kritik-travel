import axios from "axios";
import { useEffect, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { getRandomCountries } from "../utils/getRandomCountries";
import Neighbors from "./Neighbors";

export type CountryI = {
  name: string;
  url: string;
};

export type RandomCountryI = {
  name: string;
  neighbors: CountryI[];
};

const Countries = () => {
  const [allCountries, setAllCountries] = useState<CountryI[]>([]);
  const [randomCountries, setRandomCountries] = useState<
    RandomCountryI[] | null
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [storedValue, setValue] = useLocalStorage<CountryI[]>(
    "countries",
    allCountries
  );

  useEffect(() => {
    const fetchCountries = async () => {
      const storedCountries = storedValue;
      if (storedCountries?.length > 0) {
        setAllCountries(storedCountries);
      } else {
        try {
          const result = await axios.get(
            "https://travelbriefing.org/countries.json"
          );
          setAllCountries(result.data);
          setValue(result.data);
        } catch {
          setError(true);
        }
      }
      setLoading(false);
    };
    fetchCountries();
  }, []);

  const fetchRandomCountries = async () => {
    setLoading(true);
    const randomUniqueCountries = getRandomCountries(allCountries);
    try {
      const countriesData = await Promise.all(
        randomUniqueCountries.map(async ({ name }) => {
          const countryData = await axios.get(
            `https://travelbriefing.org/${name}?format=json`
          );
          return { name, neighbors: countryData.data.neighbors };
        })
      );
      setRandomCountries(countriesData);
    } catch (e) {
      setError(true);
    }
    setLoading(false);
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <button onClick={fetchRandomCountries}>Generate groupings</button>
          {randomCountries && randomCountries.length > 0 ? (
            <div>
              <h2>Selected countries</h2>
              <ul>
                {randomCountries.map(({ name }, index) => (
                  <li key={`${name}-${index}`}>
                    <p>{name}</p>
                  </li>
                ))}
              </ul>
              <Neighbors countries={randomCountries} />
            </div>
          ) : (
            !!error && <p>Oups, something happened please try later...</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Countries;
