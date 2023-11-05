'use client';
import { signOut, useSession } from 'next-auth/react';

import './ProfilePage.scss';

export default function ProfilePage() {
  const { data: session } = useSession();
  return (
    <div className="profile-page">
      <h1 className="profile-page__title">Личный кабинет</h1>
      <button onClick={() => signOut()}>Exit</button>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
}
