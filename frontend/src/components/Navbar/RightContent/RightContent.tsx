import React from 'react';
import AuthButtons from './AuthButtons'; // Import the adapted AuthButtons component
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import UserMenu from './UserMenu'; // Assuming you have UserMenu implemented
import { User } from 'firebase/auth';

type RightContentProps = {
  user?: User | null;
};

const RightContent: React.FC<RightContentProps> = ({ user }) => {

  return (
    <div className="flex items-center space-x-2">
      { user ? <UserMenu user={user} /> : <AuthButtons />}
    </div>
  );
};

export default RightContent;