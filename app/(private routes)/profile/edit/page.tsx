'use client';
import Image from 'next/image';
import css from './Edit.module.css';
import { useAuthStore } from '@/lib/store/authStore';
import { useRouter } from 'next/navigation';

import { updateMe } from '@/lib/api/clientApi';
import { useState } from 'react';

const Page = () => {
  const user = useAuthStore(s => s.user);
  const setUser = useAuthStore(s => s.setUser);
  const router = useRouter();
  const [username, setUsername] = useState('');

  const handleSubmit = async () => {
    const UpdUsername = username || user?.username || '';
    const finalUser = await updateMe({ username: UpdUsername });
    setUser(finalUser);
    router.push('/profile');
  };
  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        {user?.avatar && (
          <Image
            src={user.avatar}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        )}

        <form className={css.profileInfo} action={handleSubmit}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username: </label>
            <input
              id="username"
              type="text"
              className={css.input}
              name="username"
              value={username || user?.username || ''}
              onChange={e => setUsername(e.target.value)}
            />
          </div>

          <p>Email: {user?.email}</p>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button
              type="button"
              className={css.cancelButton}
              onClick={() => router.push('/profile')}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Page;
