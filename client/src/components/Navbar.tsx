import { Link, NavLink, useNavigate } from "react-router-dom";
import useLoginModal from "../hooks/useLoginModal";
import useRegisterModal from "../hooks/useRegisterModal";
import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { SelectAuthState, logOut } from "../redux/reducers/authSlice";
import useUserProfile from "../hooks/useUserProfile";
import useToggle from "../hooks/useToggle";
// import {  axiosPrivate } from "../http";
import toast from "react-hot-toast";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const profileToggle = useToggle();
  const { isAuth } = useAppSelector(SelectAuthState);
  const { data: user } = useUserProfile();

  const onToggleLogin = useCallback(() => {
    loginModal.onOpen();
  }, [loginModal]);

  const onToggleRegister = useCallback(() => {
    registerModal.onOpen();
  }, [registerModal]);

  const handleLogout = async () => {
    try {
      // await axiosPrivate.post("/auth/logout");
      dispatch(logOut());
      profileToggle.onClose();
      toast.success("User logged out");
      navigate("/")
    } catch (error) {
      console.log(error);
    }
  };


  

  return (
    <header className="flex items-center justify-between sticky top-0 bg-white w-full shadow h-[70px] sm:px-8 px-4 z-[500]">
      <Link to="/">
        <span className="md:text-3xl text-2xl font-bold cursor-pointer">
          QTrip
        </span>
      </Link>

      <div className="flex items-center gap-4">
        {isAuth ? (
          <>
            <NavLink to="/" className="sm:text-lg font-medium cursor-pointer">
              Home
            </NavLink>
            <button
              onClick={() => navigate("/adventure/reservation")}
              className="bg-blue-700 text-white hover:bg-blue-800 transition duration-300  text-sm rounded-lg px-4 py-[10px] cursor-pointer font-medium hover:shadow hover:bg-black/95"
            >
              Reservations
            </button>
            <div
             ref={profileToggle.toggleRef}
             onClick={profileToggle.onToggle}
              className="w-10 h-10 rounded-full relative"
            >
              <img
                // src={
                //   user && user?.image
                //     ? `${BACKEND_URL}/${user?.image}`
                //     : "https://res.cloudinary.com/pavitarsharma/image/upload/v1683457291/dm5pkbvd9q10mwqxrbdp.png"
                // }
                src="https://res.cloudinary.com/pavitarsharma/image/upload/v1683457291/dm5pkbvd9q10mwqxrbdp.png"
                alt="profile"
                className="w-full h-full object-cover rounded-full cursor-pointer"
              />

              {profileToggle.open && (
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="absolute w-[200px] h-autorounded-md shadow-lg z-10 p-2 -left-40 top-11 bg-white border"
                >
                  <p className="text-lg font-semibold">{user?.name}</p>
                  <p className="text-gray-700 text-sm my-2">{user?.email}</p>

                  <p
                    onClick={() => {
                      navigate("/profile");
                      profileToggle.onClose();
                    }}
                    className="py-2 cursor-pointer border-t border-b border-gray-300 mb-4"
                  >
                    Profile
                  </p>
                  <button
                    onClick={handleLogout}
                    className="w-full h-10 rounded-md cursor-pointer border border-gray-300"
                  >
                    Log out
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <button
              onClick={onToggleLogin}
              className="border border-blue-700 text-sm rounded-lg px-4 h-10 cursor-pointer font-medium"
            >
              Login
            </button>
            <button
              onClick={onToggleRegister}
              className="bg-blue-700 text-white text-sm rounded-lg px-4 h-10 hover:bg-blue-800 transition duration-300 cursor-pointer font-medium hover:shadow hover:bg-black/95"
            >
              Register
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;
