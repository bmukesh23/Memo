import { useState } from "react"
import { MdAdd, MdClose } from "react-icons/md"

const TagInput = ({ tags, setTags }) => {

    const [inputValue, setInputValue] = useState("");

    const addNewTag = () => {
        if (inputValue.trim() !== "") {
            setTags([...tags, inputValue.trim()]);
            setInputValue("");
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            addNewTag();
        }
    }

    const handleRemoveTag = (tagToRemove) => {
        setTags(tags.filter((tag) => tag !== tagToRemove));
    }

    return (
        <div>
            {tags?.length > 0 && (
                <div className="flex items-center gap-2 flex-wrap mt-2">
                    {tags.map((tag, index) => (
                        <span key={index} className="flex items-center gap-2 text-xs sm:text-sm bg-slate-700 px-3 py-1 rounded font-semibold">
                            # {tag}
                            <button
                                onClick={() => {
                                    handleRemoveTag(tag)
                                }}
                            >
                                <MdClose />
                            </button>
                        </span>
                    ))}
                </div>
            )}

            <div className="flex items-center gap-3 mt-3">
                <input
                    type="text"
                    className="text-xs sm:text-sm bg-slate-700 px-1 sm:px-3 py-2 rounded outline-none font-semibold"
                    placeholder="Add tags"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                />

                <button
                    className="w-8 h-8 flex items-center justify-center rounded bg-slate-700 hover:bg-slate-600"
                    onClick={() => {
                        addNewTag();
                    }}
                >
                    <MdAdd className="text-lg sm:text-2xl" />
                </button>
            </div>
        </div>
    )
}
export default TagInput