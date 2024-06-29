/* eslint-disable react/prop-types */
import addNoteSvg from "/note.svg";
import errorSvg from "/error.svg";

const EmptyCard = ({ isSearch, message }) => {
    return (
        <div className="flex flex-col items-center justify-center mt-20">
            {isSearch ? <img src={errorSvg} className="h-80 w-80" /> : <img src={addNoteSvg} className="h-80 w-80" />}

            <p className="w-1/3 text-md font-medium text-slate-400 text-center mt-5">
                {message}
            </p>
        </div>
    )
}
export default EmptyCard;