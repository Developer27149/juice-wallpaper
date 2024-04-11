'use client';

import { useRouter } from 'next/navigation';
import { deleteWallpaper } from '../../actions';

interface DeleteButtonProps {
  id: string;
}
export default function DeleteButton({ id }: DeleteButtonProps) {
  const router = useRouter();
  return (
    <button
      className="delete-wallpaper border bg-red-500 text-white p-0.5 px-1 rounded-sm text-sm"
      onClick={async () => {
        await deleteWallpaper(id);
        router.refresh();
      }}
    >
      Delete
    </button>
  );
}
