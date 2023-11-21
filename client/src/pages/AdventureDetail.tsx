import { useNavigate, useParams } from "react-router-dom";
import { Container } from "../components";
import useAdventureDetail from "../hooks/useAdventureDetail";
import Slider from "react-slick";
import React, { useEffect, useState } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAppSelector } from "../redux/hook";
import { SelectAuthState } from "../redux/reducers/authSlice";
import toast from "react-hot-toast";
import { BACKEND_URL, axiosPrivate } from "../http";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { AxiosError } from "axios";
import { Rating } from "@mui/material";

type FormInput = {
  name: string;
  date: string;
  total?: string;
};
const AdventureDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { isAuth } = useAppSelector(SelectAuthState);
  const { data, mutate } = useAdventureDetail(id as string);
  const [activeSlide, setActiveSlide] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [isFavorite, setIsFavorite] = useState(data?.isFavorite);
  const [rating, setRating] = useState<number | null>(data?.reviews);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormInput>();


  const watchTotal = Number(watch("total")) || 0;

  useEffect(() => {
    if (watchTotal !== 0) {
      setTotalCost(watchTotal * data?.costPerHead);
    } else {
      setTotalCost(0);
    }
  }, [watchTotal, data]);

  const afterChangeHandler = (currentSlide: number) => {
    setActiveSlide(currentSlide);
  };

  const PrevArrow: React.FC<{ onClick: React.MouseEventHandler }> = ({
    onClick,
  }) => {
    return (
      <div
        onClick={onClick}
        className="absolute z-10 flex items-center justify-center bg-white w-10 h-10 rounded-full top-1/2 -translate-y-1/2 text-black cursor-pointer left-4"
      >
        <MdChevronLeft size={24} />
      </div>
    );
  };

  const NextArrow: React.FC<{ onClick: React.MouseEventHandler }> = ({
    onClick,
  }) => {
    return (
      <div
        onClick={onClick}
        className="bg-white text-black w-10 h-10 flex items-center justify-center rounded-full cursor-pointer absolute right-0 z-10 top-1/2 right-4"
      >
        <MdChevronRight size={24} />
      </div>
    );
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    adaptiveHeight: true,
    afterChange: afterChangeHandler,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    appendDots: (dots) => <div className="">{dots}</div>,
    customPaging: (i) => {
      return (
        <div
          className={`z-10 w-3 h-3 rounded-full border absolute border-gray-500 ${
            i == activeSlide && "bg-black"
          }`}
        />
      );
    },
  };

  const onSubmit: SubmitHandler<FormInput> = async (values) => {
    const responseBody = {
      name: values.name,
      date: new Date(values.date),
      person: Number(values.total),
      price: Number(totalCost),
      adventureId: data?._id,
    };

    if (isAuth) {
      try {
        const response = await axiosPrivate.patch(
          "/adventure/reserved",
          responseBody
        );
        console.log(response.data);
        mutate(`${BACKEND_URL}/adventure/reserved`);
        toast.success(`Your reserved ${data.name}.`);
      } catch (error) {
        console.log(error);
        let message;
        if (error instanceof AxiosError && error.response?.status === 404) {
          message = error.response?.data?.message;
        } else if (
          error instanceof AxiosError &&
          error.response?.status === 400
        ) {
          message = error.response?.data?.message;
        } else {
          message = "Something went wrong.";
        }

        toast.error(message);
      }
    } else {
      toast.error("You are not logged in please login first.");
    }
  };

  const onFavoriteToggle = async () => {
    if (isAuth) {
      setIsFavorite((prevState: boolean) => !prevState);
      try {
        const requestData = {
          isFavorite: isFavorite,
        };

        const response = await axiosPrivate(
          `/adventure/${data?._id}/favorite`,
          {
            method: "PATCH", // or the appropriate HTTP method
            data: requestData,
          }
        );
        mutate(`${BACKEND_URL}/adventure/${data?._id}/favorite`);

        console.log(response);
      } catch (error) {
        console.log(error);
        let message;
        if (error instanceof AxiosError && error.response?.status === 404) {
          message = error.response?.data?.message;
        } else if (
          error instanceof AxiosError &&
          error.response?.status === 400
        ) {
          message = error.response?.data?.message;
        } else {
          message = "Something went wrong.";
        }

        toast.error(message);
      }
    } else {
      toast.error("You are not logged in please login first.");
    }
  };

  const handleRating = async (value: number | null) => {
    if (isAuth) {
      setRating(value);
      try {
        const requestData = {
          reviews: value,
        };

        await axiosPrivate.patch(`/adventure/${data?._id}/review`, requestData);
        mutate(`${BACKEND_URL}/adventure/${data?._id}/review`);
      } catch (error) {
        let message;
        if (error instanceof AxiosError && error.response?.status === 404) {
          message = error.response?.data?.message;
        } else if (
          error instanceof AxiosError &&
          error.response?.status === 400
        ) {
          message = error.response?.data?.message;
        } else {
          message = "Something went wrong.";
        }

        toast.error(message);
      }
    } else {
      toast.error("You are not logged in please login first.");
    }
  };

  const isSold = data?.reserved;

  return (
    <Container>
      <div className="mt-12 mb-16">
        {isSold && (
          <div className="flex items-center bg-green-200 h-14 px-4 rounded-lg mb-12">
            <span>
              Greetings! Reservation for this adventure is successful.
            </span>
            <span>
              (Click{" "}
              <b
                className="cursor-pointer"
                onClick={() => navigate("/adventure/reservation")}
              >
                here{" "}
              </b>
              to view your reservations)
            </span>
          </div>
        )}
        <div className="grid lg:grid-cols-3 grid-cols-1 gap-6">
          {/* Adventure Detail */}
          <div className="lg:col-span-2 border shadow p-4">
            <div className="flex  justify-between">
              <div className="mb-4">
                <h2 className="text-3xl font-bold">{data?.name}</h2>
                <p className="text-lg tracking-wider text-gray-600 font-medium">
                  {data?.subtitle}
                </p>
              </div>

              <button onClick={onFavoriteToggle} className="cursor-pointer">
                {isFavorite ? (
                  <AiFillHeart size={30} color="red" />
                ) : (
                  <AiOutlineHeart size={30} />
                )}
              </button>
            </div>
            <div>
              <Slider {...settings}>
                {data?.images?.map((image: string, index: number) => (
                  <div key={index} className="sm:h-[600px] h-[400px] relative">
                    <img
                      src={image}
                      alt="image"
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>
                ))}
              </Slider>
            </div>

            <div className="w-full h-[1px] bg-gray-300 mt-10" />

            <div className="mt-6">
              <p>Rate Your Adventure </p>
              <Rating
                name="half-rating"
                value={rating}
                defaultValue={data?.reviews}
                onChange={(event, newValue) => {
                  handleRating(newValue);
                }}
                precision={0.5}
              />
            </div>

            <div className="mt-4">
              <h5 className="text-lg font-semibold">About the Experience</h5>
              <p className="my-2 tracking-wider text-gray-700 text-sm font-medium">
                {data?.content}
              </p>
            </div>

            {data?.available && (
              <div className="bg-green-600 mt-6 text-white w-[100px] h-10 rounded-full flex items-center justify-center text-sm">
                #Available
              </div>
            )}
          </div>

          {/* Reserve Adventure */}
          <div>
            {isSold ? (
              <div className="shadow p-4 border">
                <h3 className="text-2xl font-bold">Sold Out!</h3>
                <div className="w-full h-[1px] bg-gray-300 my-3" />
                <p className="text-lg text-gray-800">
                  This activity is currently sold out. But there's a lot more to
                  <span
                    onClick={() => navigate("/")}
                    className="ml-1 text-yellow-600 cursor-pointer"
                  >
                    explore
                  </span>
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="shadow p-4 border"
              >
                <div className="flex flex-col">
                  <label htmlFor="name">Name</label>
                  <input
                    id="name"
                    type="text"
                    {...register("name", {
                      required: "Name is required field!",
                    })}
                    className="w-full rounded border border-gray-300 h-10 px-2 focus:outline-blue-600"
                  />
                  <small className="text-red-600 ml-1">
                    {errors?.name?.message}
                  </small>
                </div>

                <div className="flex flex-col my-4">
                  <label htmlFor="date">Pick a Date</label>
                  <input
                    id="date"
                    type="date"
                    {...register("date", {
                      required: "Date is required field!",
                    })}
                    className="w-full rounded border border-gray-300 h-10 px-2 focus:outline-blue-600"
                  />
                  <small className="text-red-600 ml-1">
                    {errors?.date?.message}
                  </small>
                </div>

                <div className="w-full h-[1px] bg-gray-300 mt-6" />

                <div className="flex items-center justify-between my-4">
                  <div>
                    <span className="font-semibold text-lg">Person(s)</span>
                    <p>
                      ₹
                      <span className="ml-1 text-gray-700">
                        {data?.costPerHead} per head
                      </span>
                    </p>
                  </div>

                  <input
                    type="text"
                    defaultValue={0}
                    {...register("total")}
                    className="w-[100px] rounded border border-gray-300 h-10 px-2 focus:outline-blue-600"
                  />
                </div>

                <div className="w-full h-[1px] bg-gray-300 mt-6" />

                <div className="flex items-center justify-between my-4">
                  <p className="font-semibold text-lg">Total</p>
                  <p className="font-semibold text-lg">
                    ₹<span className="ml-1">{totalCost}</span>
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full bg-yellow-600 text-white h-12 rounded cursor-pointer hover:bg-yellow-700 transition duration-300 mt-4"
                >
                  Reserve
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default AdventureDetail;
