import { useState } from "react";
import { CityCard, Hero } from "../components";
import useCities from "../hooks/useCities";
import { City } from "../utils/types";
import useDebounce from "../hooks/useDebounce";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const debounceSearch = useDebounce(searchTerm);
  const { data: cities } = useCities({ search: debounceSearch });

  return (
    <>
      <Hero search={searchTerm} setSearch={setSearchTerm} />
      <div className="my-12">
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 max-w-[92rem] w-full px-4 mx-auto">
          {cities?.map((city: City) => (
            <CityCard key={city?.id} city={city} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
