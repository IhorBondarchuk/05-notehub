import axios from "axios";
import type { CreateNote, Note, UpdateNote } from "../types/note";

export interface NotesHttpResponse {
  notes: Note[];
  totalPages: number;
}

const MY_KEY = import.meta.env.VITE_NOTEHUB_TOKEN;

axios.defaults.baseURL = "https://notehub-public.goit.study/api";

const getNotes = async (page: number): Promise<NotesHttpResponse> => {
  const options = {
    params: {
      page,
      perPage: 12,
    },
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${MY_KEY}`,
    },
  };

  const response = await axios.get<NotesHttpResponse>("/note", options);
  return response.data;
};

const createNote = async (payload: CreateNote) => {
  const options = {
    params: {
      payload,
    },
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${MY_KEY}`,
    },
  };

  const response = await axios.post<Note>("/todos", options);
  return response.data;
};

const deleteNote = async (noteId: Note["id"]): Promise<void> => {
  const options = {
    params: {
      noteId,
    },
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${MY_KEY}`,
    },
  };
  await axios.delete("/todos", options);
};

const updateNote = async (
  noteId: Note["id"],
  payload: UpdateNote
): Promise<Note> => {
  const options = {
    params: {
      payload,
      noteId,
    },
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${MY_KEY}`,
    },
  };
  const response = await axios.put<Note>("/todos", options);
  return response.data;
};

export { getNotes, createNote, deleteNote, updateNote };
