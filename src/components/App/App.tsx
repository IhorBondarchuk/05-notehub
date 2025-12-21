import { useState } from "react";
import css from "./App.module.css";
import { useQuery } from "@tanstack/react-query";
import { fetchNotes, type NotesHttpResponse } from "../../services/noteService";
import SearchBox from "../SearchBox/SearchBox";
import Pagination from "../Pagination/Pagination";
import NoteList from "../NoteList/NoteList";
import Loader from "../Loader/Loader";
import ErrorMessageComp from "../ErrorMessageComp/ErrorMessageComp";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";
import { Toaster } from "react-hot-toast";
import { useDebouncedCallback } from "use-debounce";

export default function App() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>("");

  const debouncedSearch = useDebouncedCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchText(e.target.value);
      setCurrentPage(1);
    },
    500
  );

  const {
    data: { notes = [], totalPages = 0 } = {},
    isLoading,
    isError,
    error,
  } = useQuery<NotesHttpResponse, Error>({
    queryKey: ["notes", currentPage, searchText],
    queryFn: () => fetchNotes(searchText, currentPage),
  });

  return (
    <>
      <div className={css.app}>
        <header className={css.toolbar}>
          <SearchBox search={searchText} onChange={debouncedSearch} />
          {totalPages > 1 && (
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          )}
          <button
            className={css.button}
            onClick={() => {
              setIsOpenModal(true);
            }}
          >
            Create note +
          </button>
        </header>
        {notes.length > 0 && <NoteList notes={notes || []} />}
        {isLoading && <Loader />}
        {isError && <ErrorMessageComp error={error?.message} />}
      </div>
      {isOpenModal && (
        <Modal
          onClose={() => {
            setIsOpenModal(false);
          }}
        >
          <NoteForm onClose={() => {}} />
        </Modal>
      )}
      <Toaster position="bottom-center" reverseOrder={true} />
    </>
  );
}
