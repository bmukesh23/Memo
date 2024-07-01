import { useState, useEffect } from "react"
import { toast } from "react-toastify";
import { MdClose } from "react-icons/md";
import TagInput from "@/components/TagInput"
import axiosInstance from "@/utils/axiosInstance";

const AddEditNotes = ({ noteData, type, getAllNotes, onClose }) => {
  const [title, setTitle] = useState(noteData?.title || "");
  const [content, setContent] = useState(noteData?.content || "");
  const [tags, setTags] = useState(noteData?.tags || []);
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleInput = async () => {
      const lastTwoChars = content.slice(-2);
      console.log(lastTwoChars);
      if (lastTwoChars === '++') {
        try {
          const response = await axiosInstance.post('/gemini', { content });
          setContent(content.slice(0, -2) + response.data.text);
        } catch (error) {
          console.error('Error communicating with the Gemini API', error);
          toast.error('Failed to autocomplete content. Please try again.');
        }
      }
    };

    document.addEventListener('input', handleInput);
    return () => {
      document.removeEventListener('input', handleInput);
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
          className="text-lg sm:text-2xl bg-slate-700 outline-none p-1 sm:p-2 rounded-md font-semibold"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <textarea
          type="text"
          className="text-xs sm:text-sm outline-none bg-slate-700 p-2 rounded-md resize-none font-semibold"
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

      <button className="btn-primary font-semibold mt-5 p-[0.5rem] sm:p-3" onClick={handleAddNote}>
        {type === "edit" ? "UPDATE" : "ADD"}
      </button>
    </section>
  )
}

export default AddEditNotes;