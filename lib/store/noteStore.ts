import { Tag } from '@/types/note';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface NotesDraft {
  title: string;
  content: string;
  tag: Tag;
}

interface DraftStoreProps {
  draft: NotesDraft;
  setNotesDraft: (body: NotesDraft) => void;
  clearNotesDraft: () => void;
}

export const useDraftStore = create<DraftStoreProps>()(
  persist(
    setStore => {
      return {
        draft: { title: '', content: '', tag: 'Todo' },
        setNotesDraft: body => {
          setStore({ draft: body });
        },
        clearNotesDraft: () => {
          setStore({
            draft: {
              title: '',
              content: '',
              tag: 'Todo',
            },
          });
        },
      };
    },
    {
      name: 'note-draft',
    }
  )
);
