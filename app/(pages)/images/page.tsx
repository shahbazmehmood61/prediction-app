'use client';
import React from 'react';
import { useFetch } from '@/app/hooks';
import { TableHead, TableBody } from '@/app/shared';
import CreatePrediction from './CreatePrediction';

function Index() {
  const { loader, error, data } = useFetch('images');
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [seletedImageId, setSelectedImageId] = React.useState<string>('');

  if (loader) return <center>Loading...</center>;

  if (error) return <center>{error}</center>;

  function handleOpen(item: { [key: string]: string | number | boolean }) {
    setIsOpen(true);
    setSelectedImageId(`${item.id}`);
  }

  function handleClose() {
    setIsOpen(false);
  }

  return (
    <>
      <table>
        <TableHead columns={columns} />
        {Array.isArray(data) && <TableBody columns={columns} rows={data} action={handleOpen} />}
      </table>
      {isOpen && (
        <CreatePrediction selectedId={seletedImageId} onClose={handleClose} isOpen={isOpen} />
      )}
    </>
  );
}

export default Index;

const columns = [
  { label: 'Filename', key: 'filename' },
  { label: 'Size', key: 'size' },
  { label: 'Created At', key: 'createdAt' },
  { label: 'PREDICT', key: 'action' }
];
