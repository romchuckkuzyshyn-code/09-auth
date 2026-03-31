import type { Metadata } from 'next';
import ProfileClient from './Profile.client';

export const metadata: Metadata = {
  title: 'Profile',
  description: 'User profile page',
};

const ProfilePage = () => {
  return <ProfileClient />;
};

export default ProfilePage;
