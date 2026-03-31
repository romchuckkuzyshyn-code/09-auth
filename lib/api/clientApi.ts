import { api } from './api';
import type { Note, NotesResponse } from '@/types/note';
import type { NotesFormValues } from '@/components/NoteForm/NoteForm';
import type { User } from '@/types/user';

interface AuthCredentials {
  email: string;
  password: string;
}

interface UpdateUserData {
  username: string;
}

export const fetchNotes = async (
  page: number,
  perPage: number,
  search?: string,
  tag?: string
): Promise<NotesResponse> => {
  const res = await api.get<NotesResponse>('/notes', {
    params: { page, perPage, search, tag },
  });
  return res.data;
};

export const fetchNoteById = async (id: Note['id']): Promise<Note> => {
  const res = await api.get<Note>(`/notes/${id}`);
  return res.data;
};

export const createNote = async (values: NotesFormValues): Promise<Note> => {
  const res = await api.post<Note>('/notes', values);
  return res.data;
};

export const deleteNote = async (id: Note['id']): Promise<Note> => {
  const res = await api.delete<Note>(`/notes/${id}`);
  return res.data;
};

export const register = async (credentials: AuthCredentials): Promise<User> => {
  const res = await api.post<User>('/auth/register', credentials);
  return res.data;
};

export const login = async (credentials: AuthCredentials): Promise<User> => {
  const res = await api.post<User>('/auth/login', credentials);
  return res.data;
};

export const logout = async (): Promise<void> => {
  await api.post('/auth/logout');
};

export const checkSession = async (): Promise<User | null> => {
  const res = await api.get<User | null>('/auth/session');
  return res.data;
};

export const getMe = async (): Promise<User> => {
  const res = await api.get<User>('/users/me');
  return res.data;
};

export const updateMe = async (data: UpdateUserData): Promise<User> => {
  const res = await api.patch<User>('/users/me', data);
  return res.data;
};
