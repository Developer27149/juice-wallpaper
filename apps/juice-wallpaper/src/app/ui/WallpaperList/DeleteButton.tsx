'use client';
import { Button } from '@mantine/core';
import { useRouter } from 'next/navigation';
import { deleteWallpaper } from '../../actions';
import clsx from 'clsx';
import { useState } from 'react';

interface DeleteButtonProps {
  id: string;
  className?: string;
}
export default function DeleteButton({
  id,
  className = '',
}: DeleteButtonProps) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  return (
    <Button
      size="xs"
      variant="danger"
      loading={loading}
      className={clsx('delete-wallpaper', className)}
      onClick={async () => {
        try {
          setLoading(true);
          await deleteWallpaper(id);
          router.refresh();
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      }}
    >
      Delete
    </Button>
  );
}
