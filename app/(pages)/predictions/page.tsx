'use client';
import React from 'react';
import { TableHead, TableBody } from '@/app/shared';
import { useFetch } from '@/app/hooks';
import { useRouter } from 'next/navigation';

function Index() {
  const { loader, error, data } = useFetch('prediction');
  const router = useRouter();

  if (loader) return <center>Loading...</center>;

  if (error) return <center>{error}</center>;

  function handleView(item: { [key: string]: string | number | boolean }) {
    // passing the prediction id and imgId to the router
    // so that I can fetch image from json-server
    // and also can fetch only predition for that image
    router.push(`predictions/${item.id}/${item.imgId}`);
  }

  return (
    <table>
      <TableHead columns={columns} />
      {Array.isArray(data) && <TableBody columns={columns} rows={data} action={handleView} />}
    </table>
  );
}

export default Index;

const columns = [
  { label: 'Title', key: 'title' },
  { label: 'Size of the image', key: 'description' },
  { label: 'Created At', key: 'createdAt' },
  { label: 'View', key: 'action' }
];
