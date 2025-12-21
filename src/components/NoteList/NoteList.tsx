import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Note } from "../../types/note";
import css from "./NoteList.module.css";
import { deleteNote } from "../../services/noteService";
import toast from "react-hot-toast";

interface NoteListProps {
  readonly notes: Note[];
}

export default function NoteList({ notes = [] }: NoteListProps) {
  const queryClient = useQueryClient();

  const deletionM = useMutation<void, Error, Note["id"]>({
    mutationFn: async (id: Note["id"]) => {
      await deleteNote(id);
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Failed to delete note"
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      toast.error("Note deleted");
    },
  });

  return (
    <ul className={css.list}>
      {notes.map(({ id, title, content, tag }) => (
        <li className={css.listItem} key={id}>
          <h2 className={css.title}>{title}</h2>
          <p className={css.content}>{content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{tag}</span>
            <button
              className={css.button}
              onClick={() => {
                deletionM.mutate(id);
              }}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
