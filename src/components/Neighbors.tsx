type NeighborsProps = {
  id?: string;
  name: string;
};

type CountryProps = {
  name: string;
  neighbors: NeighborsProps[];
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
  console.log("vecino", neighbors);

  return (
    <div>
      <h3>Neighbors</h3>
      {neighbors?.length ? (
        <ol>
          {neighbors.map((neighbor, index, arr) => {
            return (
              <li key={`${neighbor}-${index}`}>
                <span className="item">{(index ? ", " : "") + neighbor}, </span>
              </li>
            );
          })}
        </ol>
      ) : (
        <p>Not groupings found</p>
      )}
    </div>
  );
};

export default Neighbors;
