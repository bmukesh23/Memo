import addNoteSvg from "/note.svg";
import errorSvg from "/error.svg";

const EmptyCard = ({ isSearch, message }) => {
    return (
        <div className="flex flex-col items-center justify-center mt-20">
            {isSearch ? <img src={errorSvg} className="w-48 h-48 sm:w-80 sm:h-80" /> : <img src={addNoteSvg} className="w-48 h-48 sm:w-80 sm:h-80" />}

            <p className="w-[70%] sm:w-5/12 text-[11px] sm:text-base font-medium text-slate-400 text-center mt-5">
                {message}
            </p>
        </div>
    )
}
export default EmptyCard;