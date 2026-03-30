'use client';

import Pagination from '@/components/Pagination/Pagination';
import SearchBox from '@/components/SearchBox/SearchBox';
import { fetchNotes } from '@/lib/api';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useDebounce } from 'use-debounce';
import css from '@/app/notes/filter/[...slug]/page.module.css';
import NoteList from '@/components/NoteList/NoteList';
import Link from 'next/link';

interface NotesClientProps {
  category: string | undefined;
}

export default function NotesClient({ category }: NotesClientProps) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  const perPage = 12;

  const [value] = useDebounce(search, 500);

  const notesQuery = useQuery({
    queryKey: ['fetchNotes', page, perPage, value, category],
    queryFn: () => fetchNotes(page, perPage, value, category),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });
  console.log('notesQuery', notesQuery);
  console.log('error', notesQuery.error);

  const notesResponse = notesQuery.data?.notes ?? [];
  const totalPages = notesQuery.data?.totalPages ?? 0;

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox search={search} onSearch={handleSearch} />
        {totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            onPageChange={setPage}
            page={page}
          />
        )}
        <Link href="/notes/action/create" className={css.button}>
          Create note
        </Link>
      </header>
      {notesResponse.length > 0 && <NoteList notes={notesResponse} />}
    </div>
  );
}
