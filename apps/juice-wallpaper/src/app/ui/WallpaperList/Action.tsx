'use client';

import { useRouter } from 'next/navigation';
import { addWallpaper, resetWallpapers } from '../../actions';
import { Button } from '@mantine/core';
import { useState } from 'react';

export default function AddNew() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [resetting, setResetting] = useState(false);

  const handleUpdate = async () => {
    try {
      setLoading(true);
      await addWallpaper();
      router.refresh();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async () => {
    try {
      setResetting(true);
      await resetWallpapers();
      router.refresh();
    } catch (error) {
      console.log(error);
    } finally {
      setResetting(false);
    }
  };

  return (
    <div className="add-new flex gap-4">
      <Button
        onClick={handleUpdate}
        loading={loading}
        className="get-wallpaper border bg-blue-500 text-white p-1 px-2 rounded-md"
      >
        Get Wallpaper
      </Button>
      <Button
        loading={resetting}
        onClick={handleReset}
        className="get-wallpaper border bg-green-400 text-white p-1 px-2 rounded-md"
      >
        Reset
      </Button>
    </div>
  );
}
