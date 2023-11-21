import { Link } from "react-router-dom";
import { Adventure } from "../utils/types";
import { Rating } from "@mui/material";

type AdventureCardProp = {
  adventure: Adventure | null;
};

const AdventureCard = ({ adventure }: AdventureCardProp) => {
  return (
    <figure className="h-auto w-full  bg-white shadow-md border-0 rounded-b-lg relative">
      <div className="h-[350px] w-full">
        <Link to={`/adventure/detail/${adventure?._id}`}>
          <img
            src={adventure?.image}
            alt={adventure?.name}
            className="w-full h-full object-cover rounded-t-lg cursor-pointer"
          />
        </Link>
      </div>

      <div className="absolute top-4 -right-2 bg-yellow-500 text-white w-[100px] flex items-center justify-center h-10 rounded-l-full">
        {adventure?.category}
      </div>
      <figcaption className="px-2  my-3">
        <div className="flex justify-end">
          <Rating
            name="half-rating-read"
            defaultValue={adventure?.reviews}
            precision={0.5}
            readOnly
          />
        </div>
        <div className="flex items-center justify-between">
          <span className="font-semibold text-lg">{adventure?.name}</span>
          <span className="text-gray-900 font-medium">
            {adventure?.currency} {adventure?.costPerHead}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="font-semibold text-lg">Duration</span>
          <span className="text-gray-900 font-medium">
            {adventure?.duration} hours
          </span>
        </div>
      </figcaption>
    </figure>
  );
};

export default AdventureCard;
