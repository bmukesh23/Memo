import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import axiosInstance from "../../utils/axiosInstance";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../utils/firebaseConfig";

const SignUp = () => {
  const navigate = useNavigate();

  const handleAuth = async () => {
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
        console.log("User Data:", response.data);
        navigate("/dashboard");
      }

    } catch (error) {
      console.error("Authentication error:", error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="flex items-center justify-center mt-28">
        <div className="w-96 border rounded bg-white px-7 py-10">
          <button onClick={handleAuth} className="google-btn flex justify-center items-center gap-2">
            <img src="/google.svg" alt="google" />
            Sign Up with Google
          </button>
        </div>
      </div>
    </>
  );
};

export default SignUp;