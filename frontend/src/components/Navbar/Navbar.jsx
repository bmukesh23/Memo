/* eslint-disable react/prop-types */
import ProfileInfo from "../Cards/ProfileInfo";
import { useNavigate } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import { useState } from "react";
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
                <img src={logo} alt="logo" className="mt-[0.25rem]"/>
                <h2 className="text-2xl font-semibold py-2">memo</h2>
            </div>

            {userInfo &&
                <>
                    <SearchBar
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        handleSearch={handleSearch}
                        onClearSearch={onClearSearch}
                    />
                    <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
                </>
            }
        </div>
    );
};

export default Navbar;