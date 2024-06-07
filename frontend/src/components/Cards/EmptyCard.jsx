/* eslint-disable react/prop-types */
import { AiOutlineFileAdd } from "react-icons/ai";
import { TbError404 } from "react-icons/tb";

const EmptyCard = ({ isSearch, message }) => {
    return (
        <div className="flex flex-col items-center justify-center mt-40">
            {isSearch ? <TbError404 className="w-60 h-40 text-blue-800" /> : <AiOutlineFileAdd className="w-60 h-40 text-blue-800" />}

            <p className="w-1/2 text-lg font-medium text-slate-700 text-center leading-7 mt-5">
                {message}
            </p>
        </div>
    )
}
export default EmptyCard;