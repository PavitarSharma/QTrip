import React from "react";

interface HeroProp {
  search: string;
  setSearch: (value: string) => void;
}

const Hero = ({ search, setSearch }: HeroProp) => {
  return (
    <div className="w-full sm:h-[70vh] h-[50vh] bg-cover bg-no-repeat relative bg-center bg-[url('/images/hero.jpg')]">
      <div className="absolute inset-0 w-full bg-black/40 items-center h-full flex justify-center px-4">
        <div className="z-10 w-full max-w-3xl mx-auto flex flex-col items-center justify-center text-white ">
          <h2 className="sm:text-6xl text-4xl font-bold">Welcome to QTrip</h2>
          <p className="text-xl tracking-wider opacity-80 font-medium my-2 text-center ">
            Explore the world with fantastic places to venture around
          </p>

          <input
            value={search}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setSearch(event?.target.value)
            }
            type="text"
            name="search"
            placeholder="Search a City"
            className="w-full h-12 rounded-md px-4 outline-0 text-black"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
