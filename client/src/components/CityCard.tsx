import { Link } from "react-router-dom";
import { City } from "../utils/types";
import { BACKEND_URL } from "../http";

type CityCardProp = {
  city: City | null;
};

const CityCard = ({ city }: CityCardProp) => {
  return (
    <Link to={`/adventure/${city?.id}`} className="block">
      <div className="sm:h-[490px] h-[500px] w-full rounded-xl relative group cursor-pointer">
        <div className="w-full h-full">
          <img
            src={`${BACKEND_URL}/${city?.image}`}
            alt={city?.city}
            className="w-full h-full object-cover rounded-xl"
          />
        </div>
        <div className="absolute inset-0 text-white h-full flex items-center justify-end pb-6 flex-col z-4 group-hover:bg-black/30 rounded-xl">
          <h3 className="text-2xl font-semibold uppercase tracking-widest">
            {city?.city}
          </h3>
          <p className="font-medium tracking-widest text-xl">
            {city?.description}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default CityCard;
