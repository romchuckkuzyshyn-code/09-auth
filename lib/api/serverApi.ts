import axios from 'axios';
import { cookies } from 'next/headers';
import type { Note, NotesResponse } from '@/types/note';
import type { User } from '@/types/user';

const baseURL = `${process.env.NEXT_PUBLIC_API_URL}/api`;

export const fetchNotes = async (
  page: number,
  perPage: number,
  search?: string,
  tag?: string
): Promise<NotesResponse> => {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  const res = await axios.get<NotesResponse>(`${baseURL}/notes`, {
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

  const res = await axios.get<Note>(`${baseURL}/notes/${id}`, {
    headers: {
      Cookie: cookieHeader,
    },
  });

  return res.data;
};

export const getMe = async (): Promise<User> => {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  const res = await axios.get<User>(`${baseURL}/users/me`, {
    headers: {
      Cookie: cookieHeader,
    },
  });

  return res.data;
};

export const checkSession = async (): Promise<User | null> => {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  const res = await axios.get<User | null>(`${baseURL}/auth/session`, {
    headers: {
      Cookie: cookieHeader,
    },
  });

  return res.data;
};
