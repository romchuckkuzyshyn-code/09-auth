import NoteForm from '@/components/NoteForm/NoteForm';
import css from './Page.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NoteHub: Create Note',
  description: 'Create a new note',
  openGraph: {
    title: 'NoteHub: Create Note',
    description: 'Create a new note',
    url: 'http://localhost:3000/action/create/',
    siteName: 'NoteHub',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'NoteHub',
      },
    ],
  },
};

const Page = () => {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
};

export default Page;
