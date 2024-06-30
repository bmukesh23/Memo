import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileInfo from "@/components/Cards/ProfileInfo";
import SearchBar from "@/layouts/SearchBar";
import logo from "/logo.svg"

const Navbar = ({ userInfo, onSearchNote, handleClearSearch }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    const onLogout = () => {
        localStorage.clear();
        navigate("/");
    }

    const handleSearch = () => {
        if (searchQuery) {
            onSearchNote(searchQuery);
        }
    }

    const onClearSearch = () => {
        setSearchQuery("");
        handleClearSearch();
    }

    return (
        <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-1.5">
                <img src={logo} alt="logo" className="mt-[0.1rem] sm:mt-1 w-4 h-4 sm:w-[20] sm:h-[20]" />
                <h2 className="text-lg sm:text-2xl font-semibold py-2">memo</h2>
            </div>

            {userInfo &&
                <>
                    <div className="hidden sm:block">
                        <SearchBar
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            handleSearch={handleSearch}
                            onClearSearch={onClearSearch}
                        />
                    </div>

                    <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
                </>
            }
        </div>
    );
};

export default Navbar;