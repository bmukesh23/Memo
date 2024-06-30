import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

const SearchBar = ({ value, onChange, handleSearch, onClearSearch }) => {
    return (
        <div className="mx-auto sm:mx-0 w-[16rem] sm:w-96 flex items-center px-2 sm:px-4 rounded-xl border border-slate-600">
            <FaMagnifyingGlass
                className="text-slate-400 cursor-pointer hover:text-slate-200"
                onClick={handleSearch}
            />
            <input
                type="text"
                placeholder="search notes"
                className="w-full text-xs bg-transparent py-[11px] outline-none ml-3"
                value={value}
                onChange={onChange}
            />
            {value && (
                <IoMdClose
                    className="text-xl text-slate-500 cursor-pointer hover:text-slate-200"
                    onClick={onClearSearch}
                />
            )}
        </div>
    );
}

export default SearchBar;