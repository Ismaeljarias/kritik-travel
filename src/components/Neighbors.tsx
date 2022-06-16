type NeighborsProps = {
  id?: string;
  name: string;
};

type CountryProps = {
  name: string;
  neighbors: NeighborsProps[];
};

const mystyle = {
  color: "white",
  backgroundColor: "DodgerBlue",
  padding: "1indexpx",
  fontFamily: "Arial",
};

const Neighbors = ({ countries = [] as CountryProps[] }) => {
  const getNeighbors = (countries: CountryProps[]) =>
    countries.reduce((neighbors: string[] | null, country, index) => {
      country.neighbors
        .filter(
          (neighbor, i) =>
            index !== i &&
            countries.find(
              (innerCountry) => innerCountry.name === neighbor.name
            )
        )
        .forEach((neighbor) => {
          const pair = [country.name, neighbor.name].sort() as string[] | any;
          if (
            !neighbors?.some(
              (isPair) => isPair[0] === pair[0] && isPair[1] === pair[1]
            )
          ) {
            neighbors?.push(pair);
          }
        });
      return neighbors;
    }, []);

  const neighbors = getNeighbors(countries);

  return (
    <div>
      <h3>Neighbors</h3>
      {neighbors && neighbors.length > 0
        ? neighbors.map((neighbors, index) => (
            <div key={`${neighbors[index]}`}>
              {neighbors[0]}, {neighbors[1]}
            </div>
          ))
        : "No grouping found"}
    </div>
  );
};

export default Neighbors;
