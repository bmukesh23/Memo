/* eslint-disable react/prop-types */
import { useState, useEffect } from "react"
import TagInput from "../../components/Inputs/TagInput"
import { MdClose } from "react-icons/md";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from "react-toastify";

const AddEditNotes = ({ noteData, type, getAllNotes, onClose }) => {
  const [title, setTitle] = useState(noteData?.title || "");
  const [content, setContent] = useState(noteData?.content || "");
  const [tags, setTags] = useState(noteData?.tags || []);
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleKeyDown = async (e) => {
      if (e.key === '+') {
        const lastTwoChars = content.slice(-1);
        console.log(lastTwoChars);
        if (lastTwoChars === '+') {
          e.preventDefault();
          try {
            const response = await axiosInstance.post('/gemini', { content });
            setContent(content.slice(0, -1) + response.data.text);
          } catch (error) {
            console.error('Error communicating with the Gemini API', error);
            toast.error('Failed to autocomplete content. Please try again.');
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [content]);

  // Add Note
  const addNewNote = async () => {
    try {
      const response = await axiosInstance.post("/add-note", {
        title,
        content,
        tags,
      });

      if (response.data && response.data.note) {
        getAllNotes();
        onClose();
        toast.success("Note Added Successfully");
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
        toast.error("Failed to add note. Please try again.");
      }
    }
  }

  // Edit Note
  const editNote = async () => {
    const noteId = noteData._id;

    try {
      const response = await axiosInstance.put("/edit-note/" + noteId, {
        title,
        content,
        tags,
      });

      if (response.data && response.data.note) {
        getAllNotes();
        onClose();
        toast.success("Note Updated Successfully");
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
        toast.error("Failed to update note. Please try again.");
      }
    }
  }

  const handleAddNote = () => {
    if (!title) {
      setError("Please enter the title");
      return;
    }

    if (!content) {
      setError("Please enter the content");
      return;
    }

    if (type === "edit") {
      editNote();
    } else {
      addNewNote();
    }
  }

  return (
    <section className="relative pt-8">
      <button className="w-10 h-10 flex items-center justify-center absolute -top-4 -right-2.5" onClick={onClose}>
        <MdClose className="text-xl text-slate-400 hover:text-white" />
      </button>

      <div className="flex flex-col gap-2">
        <input
          type="text"
          className="text-2xl bg-slate-700 outline-none p-2 rounded-md font-semibold"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <textarea
          type="text"
          className="text-sm outline-none bg-slate-700 p-2 rounded-md resize-none font-semibold"
          placeholder={`Write your notes here or Press '++' for AI autocomplete...`}
          rows={10}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>

      <div className="mt-3">
        <TagInput tags={tags} setTags={setTags} />
      </div>

      {error && <p className="text-red-500 text-xs pt-4">{error}</p>}

      <button className="btn-primary font-semibold mt-5 p-3" onClick={handleAddNote}>
        {type === "edit" ? "UPDATE" : "ADD"}
      </button>
    </section>
  )
}

export default AddEditNotes;