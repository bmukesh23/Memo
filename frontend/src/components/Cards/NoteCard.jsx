import moment from "moment";
import { MdOutlinePushPin, MdCreate, MdDelete } from "react-icons/md";

const NoteCard = ({
    title,
    date,
    content,
    tags,
    isPinned,
    onEdit,
    onDelete,
    onPinNote,
}) => {
    return (
        <div className="rounded-md px-4 py-8 bg-slate-800 hover:shadow-xl transition-all ease-in-out font-semibold">
            <div className="flex items-center justify-between">
                <div>
                    <h6 className="text-sm">{title}</h6>
                    <span className="text-xs text-slate-300">{moment(date).format("DD MMM YYYY")}</span>
                </div>

                <MdOutlinePushPin className={`icon-btn ${isPinned ? 'text-blue-600' : 'text-slate-300'} hover:cursor-pointer`} onClick={onPinNote} />
            </div>

            <p className="text-xs text-slate-300 mt-2">{content?.slice(0, 60)}</p>

            <div className="flex items-center justify-between mt-2 ">
                <div className="text-xs text-slate-400">{tags.map((item) => `#${item} `)}</div>

                <div className="flex items-center gap-2">
                    <MdCreate
                        className="icon-btn hover:text-green-600 hover:cursor-pointer"
                        onClick={onEdit}
                    />
                    <MdDelete
                        className="icon-btn hover:text-red-600 hover:cursor-pointer"
                        onClick={onDelete}
                    />
                </div>
            </div>
        </div>
    );
};

export default NoteCard;