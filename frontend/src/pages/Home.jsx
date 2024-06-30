import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import { toast } from "react-toastify";
import { AiOutlineFileAdd } from "react-icons/ai";
import AddEditNotes from "./AddEditNotes";
import axiosInstance from "@/utils/axiosInstance";
import EmptyCard from "@/components/Cards/EmptyCard";
import Navbar from "@/layouts/Navbar";
import NoteCard from "@/components/Cards/NoteCard";
import SearchBar from "@/layouts/SearchBar";

Modal.setAppElement('#root');

const Home = () => {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const [allNotes, setAllNotes] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [isSearch, setIsSearch] = useState(false);

  const navigate = useNavigate();

  const handleEdit = (noteDetails) => {
    setOpenAddEditModal({ isShown: true, data: noteDetails, type: "edit" });
  };

  // Get User Info
  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");

      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.clear();
        navigate("/");
      }
    }

  }

  // Get All Notes
  const getAllNotes = async () => {
    try {
      const response = await axiosInstance.get("/get-all-notes");

      if (response.data && response.data.notes) {
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log("An Unexpected error occurred. Please try again.");
    }
  }

  // Delete Note
  const deleteNote = async (data) => {
    const noteId = data._id;

    try {
      const response = await axiosInstance.delete("/delete-note/" + noteId);

      if (response.data && !response.data.error) {
        getAllNotes();
        toast.success("Note Deleted Successfully");
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error("Failed to delete note. Please try again.");
        console.log("An Unexpected error occurre. Please try again.");
      }
    }
  }

  // Search Note
  const onSearchNote = async (query) => {
    try {
      const response = await axiosInstance.get("/search-notes", {
        params: { query },
      });

      if (response.data && response.data.notes) {
        setIsSearch(true);
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log(error);
    }
  }

  // Pinned Note
  const updateIsPinned = async (noteData) => {
    const noteId = noteData._id;

    try {
      const response = await axiosInstance.put("/update-note-pinned/" + noteId, {
        isPinned: !noteData.isPinned,
      });

      if (response.data && response.data.note) {
        getAllNotes();
        if (noteData.isPinned) {
          toast.success("Note Unpinned Successfully");
        } else {
          toast.success("Note Pinned Successfully");
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleClearSearch = () => {
    setIsSearch(false);
    getAllNotes();
  };

  useEffect(() => {
    getUserInfo();
    getAllNotes();
  }, []);

  return (
    <>
      <Navbar userInfo={userInfo} onSearchNote={onSearchNote} handleClearSearch={handleClearSearch} />

      <div className="mx-auto">
        <div className="block sm:hidden mt-6 sm:mt-0">
          <SearchBar />
        </div>

        {allNotes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 mx-10">
            {allNotes.map((item) => (
              <NoteCard
                key={item._id}
                title={item.title}
                date={item.createdOn}
                content={item.content}
                tags={item.tags}
                isPinned={item.isPinned}
                onEdit={() => handleEdit(item)}
                onDelete={() => deleteNote(item)}
                onPinNote={() => updateIsPinned(item)}
              />
            ))}
          </div>
        ) : (
          <EmptyCard
            isSearch={isSearch}
            message={isSearch ? `Oops! No notes found matching your search.` : `Start creating your first note! Click the 'New note' button to jot down your thoughts, ideas, and reminders. Let's get started!`}
          />
        )}
      </div>

      <button
        className="flex items-center justify-center absolute right-5 sm:right-10 bottom-5 sm:bottom-20 gap-2 border border-slate-600 p-[0.4rem] sm:p-2 rounded-lg text-sm sm:text-base"
        onClick={() => {
          setOpenAddEditModal({ isShown: true, type: "add", data: null });
        }}>
        <AiOutlineFileAdd className="text-lg sm:text-[25px] text-white" />
        New note
      </button>

      <Modal
        isOpen={openAddEditModal.isShown}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)",
          },
        }}
        contentLabel="Edit Note Modal"
        className="w-[80%] sm:w-1/2 max-h-3/4 bg-gray-800 rounded-md mx-auto mt-20 p-5"
      >
        <AddEditNotes
          type={openAddEditModal.type}
          noteData={openAddEditModal.data}
          onClose={() => {
            setOpenAddEditModal({ isShown: false, type: "add", data: null });
          }}
          getAllNotes={getAllNotes}
        />
      </Modal>
    </>
  )
}

export default Home;