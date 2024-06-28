/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";

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
    <div className="flex items-center gap-3">
      <div className="">
        <img src={profile} alt="profile" className="w-10 h-10 flex items-center justify-center rounded-full" />
      </div>

      <div>
        <p className="text-sm font-medium">{userInfo?.fullName}</p>
        <button className="text-sm text-slate-700 underline" onClick={onLogout}>
          Logout
        </button>
      </div>
    </div>
  )
}

export default ProfileInfo;