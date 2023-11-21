import Modals from "./Modal";
import useLoginModal from "../../hooks/useLoginModal";
import { useCallback, useState } from "react";
import useRegisterModal from "../../hooks/useRegisterModal";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { BACKEND_URL, axiosPublic } from "../../http";
import { AxiosError } from "axios";
import { useAppDispatch } from "../../redux/hook";
import { setCredentials } from "../../redux/reducers/authSlice";
import { mutate } from "swr";

type FormInput = {
  email: string;
  password: string;
};

const LoginModal = () => {
  const dispatch = useAppDispatch();
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormInput>();

  const onClose = useCallback(() => {
    loginModal.onClose();
    reset();
  }, [loginModal, reset]);

  const onRegisterToggle = useCallback(() => {
    registerModal.onOpen();
    onClose();
  }, [onClose, registerModal]);

  const onSubmit: SubmitHandler<FormInput> = async (values) => {
    setIsLoading(true);
    try {
      const { data } = await axiosPublic.post("/auth/login", values);
      toast.success("User logged in.");
      dispatch(setCredentials(data));
      mutate(`${BACKEND_URL}/user/profile`);
      reset();
      onClose();
    } catch (error) {
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

        <div className="flex justify-between my-3">
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="remember"
                type="checkbox"
                value=""
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 outline-0"
              />
            </div>
            <label
              htmlFor="remember"
              className="ms-2 text-sm font-medium text-gray-900"
            >
              Remember me
            </label>
          </div>
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
          Login to your account
        </button>
        <div className="text-sm font-medium text-gray-500 flex items-center mt-4">
          Not registered?{" "}
          <p
            onClick={onRegisterToggle}
            className="text-blue-700 ml-1 font-semibold cursor-pointer hover:underline"
          >
            Create account
          </p>
        </div>
      </form>
    </>
  );
  return (
    <Modals
      isOpen={loginModal.isOpen}
      onClose={onClose}
      body={bodyContent}
      title="Sign in to our platform"
    />
  );
};

export default LoginModal;
