import { useParams } from "react-router-dom";
import useAdventure from "../hooks/useAdventure";
import { AdventureCard, Container, Loading } from "../components";
import { Adventure } from "../utils/types";
import React, { useEffect, useState } from "react";
import { IoIosClose } from "react-icons/io";

const Adventure = () => {
  const { city } = useParams();
  const { data: adventures, isLoading } = useAdventure(city as string);
  const [categories, setCategories] = useState<string[]>([]);
  const [category, setCategory] = useState("");
  const [duration, setDuration] = useState("");
  const [filteredData, setFilteredData] = useState<Adventure[]>([]);

  useEffect(() => {
    if (adventures) {
      let filterAdventure = [...adventures]; // Use the spread operator to create a copy

      if (duration.split(" ")[0] === "0-2") {
        filterAdventure = filterAdventure.filter(
          (adventure) => adventure?.duration >= 0 && adventure?.duration <= 2
        );
      } else if (duration.split(" ")[0] === "2-6") {
        filterAdventure = filterAdventure.filter(
          (adventure) => adventure?.duration > 2 && adventure?.duration <= 6
        );
      } else if (duration.split(" ")[0] === "6-12") {
        filterAdventure = filterAdventure.filter(
          (adventure) => adventure?.duration > 6 && adventure?.duration <= 12
        );
      } else if (duration.split(" ")[0] === "12+") {
        filterAdventure = filterAdventure.filter(
          (adventure) => adventure?.duration > 12
        );
      }

      if (categories.length > 0) {
        filterAdventure = filterAdventure.filter((adventure) =>
          categories.includes(adventure.category)
        );
      }

      setFilteredData(filterAdventure);
    }
  }, [duration, adventures, categories]);

  const handleDurationChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setDuration(event.target.value);
  };

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedCategory = event.target.value;
    setCategory(selectedCategory);

    if (selectedCategory === "Add Category") {
      return null;
    } else {
      const extractedCategory =
        selectedCategory === "Serene Beaches"
          ? selectedCategory.split(" ")[1]
          : selectedCategory.split(" ")[0];
      if (!categories.includes(extractedCategory)) {
        // Update the state with the extracted category
        setCategories((prevCategories) => [
          ...prevCategories,
          extractedCategory,
        ]);
      }
    }
  };

  const handleDeleteCategory = (index: number) => {
    setCategories((prevCategories) => {
      const newCategories = [...prevCategories];
      newCategories.splice(index, 1);
      return newCategories;
    });
  };

  const handleClear = (type: string) => {
    if (type === "duration") {
      setDuration("");
    }

    if (type === "category") {
      setCategories([]);
      setCategory("");
    }
  };

  return (
    <Container>
      <div className="mt-24">
        <div>
          <h1 className="font-bold sm:text-4xl text-3xl">
            Explore all adventures
          </h1>
          <h4 className="sm:text-2xl text-xl text-start opacity-90 font-medium mt-1 tracking-wider">
            Here's a list of places that you can explore in city
          </h4>

          <div className="mt-6">
            <div className="w-full h-[1px] bg-gray-400 rounded" />
            <div className="my-6 flex items-center gap-6 flex-wrap">
              <div className="flex items-center gap-6">
                <p>Filter:</p>
                <div className="w-[1px] h-6 bg-gray-400 rounded"></div>

                <select
                  name="duration"
                  id="duration"
                  value={duration}
                  onChange={handleDurationChange}
                  className="w-full bg-white border border-gray-300 rounded-md h-10 px-2 cursor-pointer focus:outline-blue-300"
                >
                  <option value="">Filter by Duration (Hours)</option>
                  {["0-2", "2-6", "6-12", "12+"].map((option, index) => (
                    <option key={index}>{option} hours</option>
                  ))}
                </select>

                <button
                  onClick={() => handleClear("duration")}
                  className="border-0 outline-0 text-blue-600 cursor-pointer"
                >
                  Clear
                </button>
              </div>

              <div className="w-[1px] h-6 bg-gray-400 rounded"></div>

              <div className="flex items-center gap-6">
                <select
                  name="category"
                  id="category"
                  value={category}
                  onChange={handleCategoryChange}
                  className="w-full bg-white border border-gray-300 rounded-md h-10 px-2 cursor-pointer focus:outline-blue-300"
                >
                  <option value="">Add Category</option>
                  {[
                    "Cycling Routes",
                    "Hillside Getaways",
                    "Serene Beaches",
                    "Party Spot",
                  ].map((option, index) => (
                    <option key={index}>{option}</option>
                  ))}
                </select>
                <button
                  onClick={() => handleClear("category")}
                  className="border-0 outline-0 text-blue-600 cursor-pointer"
                >
                  Clear
                </button>
              </div>
            </div>
            <div className="w-full h-[1px] bg-gray-400 rounded" />

            <div className="flex items-center gap-4 flex-wrap mt-4">
              {categories?.length > 0 &&
                categories?.map((category, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between px-2 border border-orange-600 rounded-full h-9 w-[100px]"
                  >
                    <span>{category}</span>
                    <IoIosClose
                      onClick={() => handleDeleteCategory(index)}
                      size={20}
                      className="cursor-pointer"
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
        {isLoading ? (
          <div className="h-[450px]">
            <Loading />
          </div>
        ) : (
          <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 mt-12 mb-16">
            {filteredData?.map((adventure: Adventure) => (
              <AdventureCard key={adventure?._id} adventure={adventure} />
            ))}
          </div>
        )}
      </div>
    </Container>
  );
};

export default Adventure;
