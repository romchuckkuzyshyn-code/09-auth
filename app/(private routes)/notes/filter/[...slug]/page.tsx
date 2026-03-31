import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import NotesClient from './Notes.client';
import { Metadata } from 'next';
import { fetchNotes } from '@/lib/api/serverApi';

type NotesByCategoryProps = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({
  params,
}: NotesByCategoryProps): Promise<Metadata> {
  const { slug } = await params;
  const category = slug[0] === 'all' ? undefined : slug[0];
  return {
    title: `Notes: ${category === undefined ? 'All' : category}`,
    description: `Notes from category - ${category}`,
    openGraph: {
      title: `Notes: ${category === undefined ? 'All' : category}`,
      description: `Notes from category - ${category}`,
      url: `http://localhost:3000/notes/filter/${category}`,
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
}

const NotesByCategory = async ({ params }: NotesByCategoryProps) => {
  const page = 1;
  const perPage = 12;
  const search = '';

  const { slug } = await params;
  const category = slug[0] === 'all' ? undefined : slug[0];

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['fetchNotes', { page, perPage, search, category }],
    queryFn: () => fetchNotes(page, perPage, search, category),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient key={category ?? 'all'} category={category} />
    </HydrationBoundary>
  );
};

export default NotesByCategory;
