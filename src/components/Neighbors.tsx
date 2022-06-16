type NeighborsProps = {
  id?: string;
  name: string;
};

type CountryProps = {
  name: string;
  neighbors: NeighborsProps[];
};

const Neighbors = ({ countries = [] as CountryProps[] }) => {
  const getNeighbors = (countries: CountryProps[]) => {
    const neighborsArray = countries.reduce(
      (neighbors: string[] | null, country, index) => {
        country.neighbors
          .filter(
            (neighbor, i) =>
              index !== i &&
              countries.find(
                (innerCountry) => innerCountry.name === neighbor.name
              )
          )
          .map((neighbor) => {
            const pairCountries = [country.name, neighbor.name].sort() as
              | string[]
              | any;
            if (
              !neighbors?.some(
                (isPair) =>
                  isPair[0] === pairCountries[0] &&
                  isPair[1] === pairCountries[1]
              )
            ) {
              neighbors?.push(pairCountries);
              console.log("vecino", neighbors);
            }
          });

        return neighbors;
      },
      []
    );

    return neighborsArray;
  };

  const neighbors = getNeighbors(countries);
  // console.log("vecinos", neighbors);

  return (
    <div>
      <h3>Neighbors</h3>
      {neighbors && neighbors.length > 1
        ? neighbors.map((neighbor, index) => {
            return <div key={`${neighbor}-${index}`}>{`${neighbor}`}</div>;
          })
        : "No groupings found"}
    </div>
  );
};

export default Neighbors;
