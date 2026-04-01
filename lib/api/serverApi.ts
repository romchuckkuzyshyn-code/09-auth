import { api } from './api';
import { cookies } from 'next/headers';
import type { Note, NotesResponse } from '@/types/note';
import type { User } from '@/types/user';
import type { AxiosResponse } from 'axios';

export const fetchNotes = async (
  page: number,
  perPage: number,
  search?: string,
  tag?: string
): Promise<NotesResponse> => {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  const res = await api.get<NotesResponse>(`/notes`, {
    params: { page, perPage, search, tag },
    headers: {
      Cookie: cookieHeader,
    },
  });

  return res.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  const res = await api.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: cookieHeader,
    },
  });

  return res.data;
};

export const getMe = async (): Promise<User> => {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  const res = await api.get<User>(`/users/me`, {
    headers: {
      Cookie: cookieHeader,
    },
  });

  return res.data;
};

export const checkSession = async (): Promise<AxiosResponse<User | null>> => {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  const res = await api.get<User | null>('/auth/session', {
    headers: {
      Cookie: cookieHeader,
    },
  });

  return res;
};
