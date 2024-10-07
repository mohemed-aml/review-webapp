// frontend/src/components/UserProfile/UserProfile.tsx
import { Box, Button, Flex, Input, Text } from '@chakra-ui/react';
import axios from 'axios';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { auth } from '../../firebase/firebaseConfig';

const UserProfile: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user); // Get current user info from Redux
  const [name, setName] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const backendBaseUrl = process.env.REACT_APP_API_BASE_URL;

  const fetchUserDetails = async (firebaseUID: string) => {
    try {
      // Get the Firebase ID token for the currently logged-in user
      const token = await auth.currentUser?.getIdToken();
      if (!token) {
        console.error('No authentication token found');
        setError('User is not authenticated');
        return;
      }

      const response = await axios.get(`${backendBaseUrl}/users/${firebaseUID}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      });
      const user = response.data;

      setName(user.name);
      setUsername(user.username);
      setEmail(user.email);
    } catch (error) {
      console.error('Error fetching user details:', error);
      setError('Error fetching user details. Please try again later.');
    }
  };

  useEffect(() => {
    if (user) { fetchUserDetails(user.uid) }
  }, [user]);

  const handleSaveChanges = async () => {
    try {
      const token = await auth.currentUser?.getIdToken();
      if (!token) {
        console.error('No authentication token found');
        setError('User is not authenticated');
        return;
      }

      await axios.put(`${backendBaseUrl}/users/${user?.uid}`, {
        name,
        username,
        email,
      }, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      });

      setIsEditing(false);
      alert('Profile updated successfully');
    } catch (err) {
      setError('Error updating profile. Username might already be taken.');
    }
  };

  const handleImageUpload = async (event: { target: { files: any[]; }; }) => {
    const file = event.target.files[0];
    if (file) {
      const storage = getStorage();
      const storageRef = ref(storage, `profilePictures/${user?.uid}/${file.name}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      // Save the downloadURL to the user's profile in the database
      const token = await auth.currentUser?.getIdToken();
      if (!token) {
        console.error('No authentication token found');
        setError('User is not authenticated');
        return;
      }
      
      await axios.put(`${backendBaseUrl}/users/${user?.uid}`, { profilePicture: downloadURL }, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      });
      alert('Profile picture updated successfully');
    }
  };

  return (
    <Box className="container mx-auto px-4 py-8">
      <Flex direction="column" align="center" p={6} bg="white" shadow="md" borderRadius="md">
        <Text fontSize="2xl" fontWeight="bold" mb={4}>
          User Profile
        </Text>
        <Input
          value={name}
          placeholder="Full Name"
          mb={3}
          onChange={(e) => setName(e.target.value)}
          isReadOnly={!isEditing}
        />
        <Input
          value={username}
          placeholder="Username"
          mb={3}
          onChange={(e) => setUsername(e.target.value)}
          isReadOnly={!isEditing}
        />
        <Input
          value={email}
          placeholder="Email"
          mb={3}
          onChange={(e) => setEmail(e.target.value)}
          isReadOnly={!isEditing}
        />
        {error && <Text color="red.500" fontSize="sm">{error}</Text>}
        {isEditing ? (
          <Button colorScheme="teal" onClick={handleSaveChanges} mt={4}>
            Save Changes
          </Button>
        ) : (
          <Button colorScheme="blue" onClick={() => setIsEditing(true)} mt={4}>
            Edit Profile
          </Button>
        )}
        <Button colorScheme="gray" onClick={() => setIsEditing(false)} mt={2}>
          Cancel
        </Button>
      </Flex>
    </Box>
  );
};

export default UserProfile;