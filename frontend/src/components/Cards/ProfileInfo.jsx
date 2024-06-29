/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { IoIosLogOut } from "react-icons/io";

const ProfileInfo = ({ userInfo, onLogout }) => {
  const [profile, setProfile] = useState(null);

  const getUserProfile = async () => {
    try {
      const response = await axiosInstance.get("/get-user");

      if (response.data && response.data.user) {
        setProfile(response.data.user.imageURL);
      }
    } catch (error) {
      console.error(" Picture not found:", error);
    }

  }

  useEffect(() => {
    getUserProfile();
  });

  return (
    <section className="flex items-center">
      <div className="flex items-center gap-2 bg-slate-800 py-1 px-2 rounded-lg">
        <img src={profile} alt="profile" className="w-10 h-10 flex items-center justify-center rounded-md" />
        <div className="mr-2">
          <p className="text-xs">Signed in as</p>
          <p className="text-sm font-semibold text-slate-400">{userInfo?.fullName}</p>
        </div>
        <IoIosLogOut onClick={onLogout} className="text-2xl hover:cursor-pointer" />
      </div>
    </section>
  );
}

export default ProfileInfo;