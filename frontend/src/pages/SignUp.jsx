import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "@/utils/firebaseConfig";
import { FaGoogle } from "react-icons/fa6";
import Loader from "@/components/Loader";
import Navbar from "@/layouts/Navbar";
import axiosInstance from "@/utils/axiosInstance";

const SignUp = () => {
  const navigate = useNavigate();
  const [isLoading, setisLoading] = useState(false);

  const handleAuth = async () => {
    setisLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();
      const user = result.user;

      localStorage.setItem("token", token);

      const response = await axiosInstance.post("/create-account", {
        uid: user.uid,
        email: user.email,
        fullName: user.displayName,
      });

      if (response.data) {
        navigate("/dashboard");
      }

    } catch (error) {
      console.error("Authentication error:", error);
    } finally {
      setisLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="relative pt-28">
        <div className="bg-blue-700 absolute top-[-6rem] h-[15.25rem] w-[50rem] rounded-full blur-[10rem] -z-10 right-[14rem] sm:w-[68.75rem]" />

        <div className="flex flex-col justify-center items-center gap-4 mt-8 text-center">
          <h1 className="text-3xl sm:text-6xl font-bold leading-tight w-[90%] sm:w-[45%]">Organize your thoughts with ease</h1>
          <p className="text-xs sm:text-lg text-slate-400 w-[80%] sm:w-1/3">Memo is a minimal, AI-powered note-taking app that keeps your notes structured and easily accessible.</p>


          <button onClick={handleAuth} className="flex justify-center items-center text-[13px] sm:text-base gap-2 bg-blue-700 py-[0.35rem] px-2 sm:px-4 rounded-lg hover:bg-blue-600">
            {isLoading ? (
              <div className="flex justify-center items-center gap-2 px-16 sm:px-20">
                {" "}
                <Loader />
              </div>
            ) :
              <>
                <FaGoogle />
                Sign-in with Google
              </>
            }
          </button>

        </div>
      </div>
    </>
  );
};

export default SignUp;