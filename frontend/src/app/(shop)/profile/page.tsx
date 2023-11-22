import { getServerSession } from 'next-auth';
import './ProfilePage.scss';
import SignOutButton from './SignOutButton/SignOutButton';
import { authOptions } from '../../api/auth/[...nextauth]/handler';

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  return (
    <div className="profile-page">
      <h1 className="profile-page__title">Личный кабинет</h1>
      <SignOutButton />
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
}
