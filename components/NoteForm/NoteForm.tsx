'use client';
import css from './NoteForm.module.css';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createNote } from '@/lib/api';
import { useRouter } from 'next/navigation';
import { useDraftStore } from '@/lib/store/noteStore';

export type Tag = 'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping';

export interface NotesFormValues {
  title: string;
  content: string;
  tag: Tag;
}

const NoteForm = () => {
  const queryClient = useQueryClient();
  const notesDraft = useDraftStore(s => s.draft);
  const setNotesDraft = useDraftStore(s => s.setNotesDraft);
  const clearNotesDraft = useDraftStore(s => s.clearNotesDraft);
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const name = e.target.name;
    const value = e.target.value;
    setNotesDraft({ ...notesDraft, [name]: value });
  };
  const { mutate } = useMutation({
    mutationFn: (body: NotesFormValues) => createNote(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fetchNotes'] });
      clearNotesDraft();
      router.back();
    },
  });

  function handleSubmit() {
    const body: NotesFormValues = {
      title: notesDraft.title,
      content: notesDraft.content,
      tag: notesDraft.tag,
    };
    mutate(body);
  }

  return (
    <form className={css.form} action={handleSubmit}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          className={css.input}
          onChange={handleChange}
          value={notesDraft.title || ''}
          required
          minLength={3}
          maxLength={50}
        />
        {/* {errors.title && <span className={css.error}>{errors.title}</span>} */}
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          rows={8}
          className={css.textarea}
          onChange={handleChange}
          value={notesDraft.content || ''}
          maxLength={500}
        />
        {/* <ErrorMessage name="content" component="span" className={css.error} /> */}
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          name="tag"
          className={css.select}
          onChange={handleChange}
          value={notesDraft.tag || 'Todo'}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
        {/* <ErrorMessage name="tag" component="span" className={css.error} /> */}
      </div>

      <div className={css.actions}>
        <button
          type="button"
          className={css.cancelButton}
          onClick={() => router.back()}
        >
          Cancel
        </button>
        <button
          type="submit"
          className={css.submitButton}
          // disabled={isSubmitting}
        >
          Create note
        </button>
      </div>
    </form>
  );
};

export default NoteForm;
