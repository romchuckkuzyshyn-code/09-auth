export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  tag: Tag;
}
export interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

export type Tag = 'Work' | 'Personal' | 'Meeting' | 'Shopping' | 'Todo';

export const tags: Tag[] = ['Work', 'Personal', 'Meeting', 'Shopping', 'Todo'];
