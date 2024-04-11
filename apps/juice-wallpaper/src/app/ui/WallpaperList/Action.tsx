'use client';

import { useRouter } from 'next/navigation';
import { addWallpaper, resetWallpapers } from '../../actions';

export default async function AddNew() {
  const router = useRouter();

  const handleUpdate = async () => {
    await addWallpaper();
    router.refresh();
  };

  const handleReset = async () => {
    await resetWallpapers();
    router.refresh();
  };

  return (
    <div className="add-new flex gap-4">
      <button
        onClick={handleUpdate}
        className="get-wallpaper border bg-blue-500 text-white p-1 px-2 rounded-md"
      >
        Get Wallpaper
      </button>
      <button
        onClick={handleReset}
        className="get-wallpaper border bg-green-400 text-white p-1 px-2 rounded-md"
      >
        Reset
      </button>
    </div>
  );
}
