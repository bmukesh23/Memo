import { useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";
import { IoIosLogOut } from "react-icons/io";
import axiosInstance from "@/utils/axiosInstance";

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
  }, []);

  return (
    <section className="flex items-center">
      <div className="flex items-center gap-2 bg-slate-800 py-1 px-2 rounded-lg">
        {profile ? <img src={profile} alt="profile" className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 flex items-center justify-center rounded-md" /> : <Skeleton className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 rounded-md bg-slate-400" />}

        <div className="mr-2">
          <p className="text-[10px] sm:text-xs">Signed in as</p>
          <p className="text-xs sm:text-[13px] lg:text-sm font-semibold text-slate-400">{userInfo?.fullName}</p>
        </div>

        <IoIosLogOut onClick={onLogout} className="text-xl lg:text-2xl hover:cursor-pointer" />
      </div>
    </section>
  );
}

export default ProfileInfo;