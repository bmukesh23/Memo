import addNoteSvg from "/note.svg";
import errorSvg from "/error.svg";

const EmptyCard = ({ isSearch, message }) => {
    return (
        <div className="flex flex-col items-center justify-center mt-20">
            {isSearch ? <img src={errorSvg} className="w-48 h-48 sm:w-60 sm:h-60 lg:w-80 lg:h-80" /> : <img src={addNoteSvg} className="w-48 h-48 sm:w-60 sm:h-60 lg:w-80 lg:h-80" />}

            <p className="w-[70%] sm:w-[55%] lg:w-5/12 text-[11px] sm:text-[14px] lg:text-base font-medium text-slate-400 text-center mt-5">
                {message}
            </p>
        </div>
    )
}
export default EmptyCard;