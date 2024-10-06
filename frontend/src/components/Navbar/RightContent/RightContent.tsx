import React from 'react';
import AuthButtons from './AuthButtons'; // Import the adapted AuthButtons component
import UserMenu from './UserMenu'; // Assuming you have UserMenu implemented

// Modify RightContentProps to use SerializableUser type
type SerializableUser = {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
};

type RightContentProps = {
  user?: SerializableUser | null;
};

const RightContent: React.FC<RightContentProps> = ({ user }) => {

  return (
    <div className="flex items-center space-x-2">
      { user ? <UserMenu user={user} /> : <AuthButtons />}
    </div>
  );
};

export default RightContent;