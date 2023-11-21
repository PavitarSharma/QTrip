import React, { useEffect, useState } from "react";
import { Button, Container, Input } from "../components";
import useUserProfile from "../hooks/useUserProfile";
import { Adventure } from "../utils/types";
import { Link } from "react-router-dom";
import { BACKEND_URL, axiosPrivate } from "../http";
import toast from "react-hot-toast";
import { FaEdit } from "react-icons/fa";
import { AxiosError } from "axios";

const Profile = () => {
  const { data: user, mutate } = useUserProfile();
  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [phone, setPhone] = useState(user?.phone);
  const [address, setAddress] = useState({
    country: user?.address?.country || "",
    state: user?.address?.state || "",
    city: user?.address?.city || "",
    pinCode: user?.address?.pinCode || "",
  });
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [image, setImage] = useState(user?.image);

  useEffect(() => {
    if (user) {
      setName(user?.name);
      setEmail(user?.email);
      setPhone(user?.phone);
      setAddress({
        country: user?.adddress?.country,
        state: user?.adddress?.state,
        city: user?.adddress?.city,
        pinCode: user?.adddress?.pinCode,
      });
      setImage(user?.image);
    }
  }, [user]);

  const onAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setAddress({
      ...address,
      [name]: value,
    });
  };

  const onUpdateProfile = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const responseBody = {
      name,
      phone: Number(phone) || null,
      country: address.country || null,
      state: address.state || null,
      city: address.city || null,
      pinCode: Number(address.pinCode) || null,
    };

    try {
      await axiosPrivate.put(`/user/profile`, responseBody);
      mutate("/user/profile");
    } catch (error) {
      toast.success("Something went erong when your are upadting your profile");
    }

    console.log(responseBody);
  };

  const onPasswordUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPasswordErrorMessage("");

    if (!newPassword || !confirmPassword) {
      setPasswordErrorMessage(
        "Please enter your new password and confirm password to update your password"
      );
      return;
    } else if (newPassword !== confirmPassword) {
      setPasswordErrorMessage("Password do not match");
      return;
    }
    const responseBody = {
      newPassword,
      confirmPassword,
    };

    try {
      await axiosPrivate.post("/user/update-password", responseBody);
      toast.success("Password updated successfully.");
      mutate()
      setPasswordErrorMessage("");
      setNewPassword("");
      setConfirmPassword("");
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
        message = "Something went wrong. when your are update the password";
      }

      toast.error(message);
    }
  };

  const handleUploadImage = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files ? event.target.files[0] : null;

    if (file) {
      setImage(file);

      const formData = new FormData();
      formData.append("image", file);

      try {
        await axiosPrivate.patch("/user/profile/image", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        mutate("/user/profile/image");
        toast.success("Your profile image uploaded successfully.");
      } catch (error) {
        // Handle error appropriately
        console.error("Error uploading image:", error);
        toast.error("Something went wrong when are you uploading the image.");
      }
    }
  };

  return (
    <Container>
      <div className="mt-12 mb-16 max-w-3xl w-full mx-auto">
        <div>
          <div className="w-28 h-28 rounded-full border mb-6 relative">
            <label
              htmlFor="image"
              className=" w-6 h-6 rounded-full cursor-pointer absolute flex items-center justify-center bottom-6 -right-2"
            >
              <FaEdit size={18} />
              <input
                onChange={handleUploadImage}
                id="image"
                name="image"
                type="file"
                accept="image/*"
                hidden
              />
            </label>
            <img
              src={
                user && user?.image
                  ? `${BACKEND_URL}/${user?.image}`
                  : image
                  ? URL.createObjectURL(image)
                  : "https://res.cloudinary.com/pavitarsharma/image/upload/v1683457291/dm5pkbvd9q10mwqxrbdp.png"
              }
              className="w-full h-full rounded-full object-cover"
              alt="profile-image"
            />
          </div>
          <div className="grid sm:grid-cols-2 grid-cols-1 gap-x-6 gap-y-3">
            <Input
              name="name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              label="Name"
            />

            <Input
              name="email"
              id="email"
              type="email"
              value={email}
              // onChange={(e) => setEmail(e.target.value)}
              label="Email"
              disabled
            />

            <Input
              name="phone"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              label="Phone"
            />

            <Input
              name="country"
              id="country"
              value={address.country}
              onChange={onAddressChange}
              label="Country"
            />

            <Input
              name="state"
              id="state"
              value={address.state}
              onChange={onAddressChange}
              label="State"
            />

            <Input
              name="city"
              id="city"
              value={address.city}
              onChange={onAddressChange}
              label="City"
            />

            <Input
              name="pinCode"
              id="pinCode"
              value={address.pinCode}
              onChange={onAddressChange}
              label="Pin Code"
            />
          </div>
          <div className="sm:w-1/6 w-full mt-2">
            <Button label="Save" onClick={onUpdateProfile} />
          </div>
        </div>

        <div className="sm:w-1/2 w-full mt-12">
          <p className="text-2xl font-semibold mb-5">Update Password</p>
          <Input
            type="password"
            label="New Password"
            id="newPassword"
            name="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <Input
            type="password"
            label="Confirm Password"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          {passwordErrorMessage && (
            <span className="text-sm text-red-600">{passwordErrorMessage}</span>
          )}

          <div className="sm:w-1/4 w-full mt-2">
            <Button label="Save" onClick={onPasswordUpdate} />
          </div>
        </div>

        <div className="my-12">
          <p className="sm:text-3xl text-2xl font-bold text-gray-800">
            Your Favorite Trip
          </p>

          <div className="grid md:grid-cols-3  min-[520px]:grid-cols-2 grid-cols-1 gap-6 mt-12 mb-16">
            {user?.favorites?.map((adventure: Adventure) => (
              <figure
                key={adventure?._id}
                className="h-[300px] w-full  bg-white shadow-md border-0 rounded-b-lg relative"
              >
                <div className="h-[70%] w-full">
                  <Link to={`/adventure/detail/${adventure?._id}`}>
                    <img
                      src={adventure?.image}
                      alt={adventure?.name}
                      className="w-full h-full object-cover rounded-t-lg cursor-pointer"
                    />
                  </Link>
                </div>

                <div className="absolute top-4 -right-2 bg-yellow-500 text-white w-[80px] text-sm flex items-center justify-center h-8 rounded-l-full">
                  {adventure?.category}
                </div>
                <figcaption className="px-2  my-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-base">
                      {adventure?.name}
                    </span>
                    <span className="text-gray-900 text-base font-medium">
                      {adventure?.currency} {adventure?.costPerHead}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-base">Duration</span>
                    <span className="text-gray-900 text-base font-medium">
                      {adventure?.duration} hours
                    </span>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Profile;
