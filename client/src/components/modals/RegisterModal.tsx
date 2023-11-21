import Modals from "./Modal";
import useLoginModal from "../../hooks/useLoginModal";
import { useCallback, useState } from "react";
import useRegisterModal from "../../hooks/useRegisterModal";
import { useForm, SubmitHandler } from "react-hook-form";
import { axiosPublic } from "../../http";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import useUserProfile from "../../hooks/useUserProfile";

type FormInput = {
  email: string;
  password: string;
  name: string;
};

const RegsiterModal = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);
  const { mutate } = useUserProfile();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormInput>();

  const onClose = useCallback(() => {
    registerModal.onClose();
    reset();
  }, [registerModal, reset]);

  const onLoginModalToggle = useCallback(() => {
    onClose();
    loginModal.onOpen();
  }, [onClose, loginModal]);

  const onSubmit: SubmitHandler<FormInput> = async (values) => {
    setIsLoading(true);
    try {
      await axiosPublic.post("/auth/register", values);
      toast.success("User Register successfully. Now you can login");
      mutate();
      setTimeout(() => {
        onLoginModalToggle();
      }, 1000);

      reset();
    } catch (error) {
      console.log(error);
      let message;
      if (error instanceof AxiosError && error.response?.status === 409) {
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
    } finally {
      setIsLoading(false);
    }
  };

  const bodyContent = (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Your name
          </label>
          <input
            type="text"
            {...register("name", { required: true })}
            id="email"
            className={`bg-gray-50 mb-3 border ${
              errors?.name?.type
                ? "border-red-400 focus:ring-red-500 focus:border-red-500"
                : "border-gray-400 focus:ring-blue-500 focus:border-blue-500"
            }   text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-0 block w-full p-2.5`}
            placeholder="John Doe"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Your email
          </label>
          <input
            type="email"
            {...register("email", { required: true })}
            id="email"
            className={`bg-gray-50 mb-3 border ${
              errors?.email?.type
                ? "border-red-400 focus:ring-red-500 focus:border-red-500"
                : "border-gray-400 focus:ring-blue-500 focus:border-blue-500"
            }   text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-0 block w-full p-2.5`}
            placeholder="name@company.com"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Your password
          </label>
          <input
            type="password"
            {...register("password", { required: true })}
            id="password"
            placeholder="••••••••"
            className={`bg-gray-50 border ${
              errors?.password?.type
                ? "border-red-400 focus:ring-red-500 focus:border-red-500"
                : "border-gray-400 focus:ring-blue-500 focus:border-blue-500"
            }   text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-0 block w-full p-2.5`}
          />
        </div>

        <button
          disabled={isLoading}
          type="submit"
          className={`w-full text-white ${
            isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-700 hover:bg-blue-800"
          }   focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center`}
        >
          Register
        </button>
        <div className="text-sm font-medium text-gray-500 flex items-center mt-4">
          Already have an account?{" "}
          <p
            onClick={onLoginModalToggle}
            className="text-blue-700 ml-1 font-semibold cursor-pointer hover:underline"
          >
            Sign in
          </p>
        </div>
      </form>
    </>
  );
  return (
    <Modals
      isOpen={registerModal.isOpen}
      onClose={onClose}
      body={bodyContent}
      title="Create a new account"
    />
  );
};

export default RegsiterModal;
