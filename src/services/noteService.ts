import axios from "axios";
import type { CreateNote, Note } from "../types/note";

export interface NotesHttpResponse {
  notes: Note[];
  totalPages: number;
}

const MY_KEY = import.meta.env.VITE_NOTEHUB_TOKEN;

axios.defaults.baseURL = "https://notehub-public.goit.study/api";

export const fetchNotes = async (
  searchText: string,
  page: number
): Promise<NotesHttpResponse> => {
  const options = {
    params: {
      ...(searchText !== "" && { search: searchText }),
      page,
      perPage: 12,
    },
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${MY_KEY}`,
    },
  };
  const response = await axios.get<NotesHttpResponse>("/notes", options);
  return response.data;
};

export const createNote = async (payload: CreateNote): Promise<Note> => {
  const options = {
    params: {
      payload,
    },
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${MY_KEY}`,
    },
  };
  const response = await axios.post<Note>("/notes", options);
  return response.data;
};

export const deleteNote = async (noteId: Note["id"]): Promise<void> => {
  const options = {
    params: {
      noteId,
    },
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${MY_KEY}`,
    },
  };
  await axios.delete<void>("/notes", options);
};
