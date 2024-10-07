// frontend/src/components/UserProfile/UserProfile.tsx
import {
  Box,
  Button,
  Flex,
  Avatar,
  Input,
  Text,
  IconButton,
  Heading,
  Divider,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';
import axios from 'axios';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { auth, storage } from '../../firebase/firebaseConfig';


const UserProfile: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user); // Get current user info from Redux
  const [name, setName] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [profilePicture, setProfilePicture] = useState<string | undefined>('');

  const backendBaseUrl = process.env.REACT_APP_API_BASE_URL;
  const inputBackground = useColorModeValue('gray.50', 'gray.800');

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
      setProfilePicture(user.profilePicture || '');
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

      await axios.put(`${backendBaseUrl}/users/${user?.uid}`, { name, username, email }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setIsEditing(false);
      alert('Profile updated successfully');
    } catch (err) {
      setError('Error updating profile. Username might already be taken.');
    }
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];   
    if (file) {
      const storageRef = ref(storage, `profilePictures/${user?.uid}/${file.name}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);

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
      setProfilePicture(downloadURL);
      alert('Profile picture updated successfully');
    }
  };
  
  return (
    <Box className="container mx-auto px-4 py-8">
      <Flex direction="column" align="center" p={6} bg="white" shadow="lg" borderRadius="lg" maxWidth="600px" mx="auto">
        <Avatar size="2xl" src={profilePicture || undefined} mb={4} />
        <Button variant="outline" size="sm" mb={6}>
          <label htmlFor="file-upload" style={{ cursor: 'pointer' }}>
            Upload Profile Picture
          </label>
          <input
            id="file-upload"
            type="file"
            style={{ display: 'none' }}
            onChange={handleImageUpload}
          />
        </Button>

        <Heading as="h2" size="lg" mb={2} textAlign="center">
          {isEditing ? 'Edit Your Profile' : 'User Profile'}
        </Heading>
        <Text fontSize="md" color="gray.600" mb={4} textAlign="center">
          View and edit your account details below.
        </Text>
        <Divider mb={6} />

        <VStack spacing={4} width="100%">
          <Input
            value={name}
            placeholder="Full Name"
            onChange={(e) => setName(e.target.value)}
            isReadOnly={!isEditing}
            focusBorderColor={isEditing ? 'teal.400' : 'gray.300'}
          />
          <Input
            value={username}
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            isReadOnly={!isEditing}
            focusBorderColor={isEditing ? 'teal.400' : 'gray.300'}
          />
          <Input
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            isReadOnly={!isEditing}
            focusBorderColor={isEditing ? 'teal.400' : 'gray.300'}
          />
          {error && <Text color="red.500" fontSize="sm">{error}</Text>}
        </VStack>

        <Flex mt={6} justifyContent="space-between" width="100%">
          {isEditing ? (
            <>
              <Button colorScheme="teal" onClick={handleSaveChanges} width="48%">
                Save Changes
              </Button>
              <Button colorScheme="gray" onClick={() => setIsEditing(false)} width="48%">
                Cancel
              </Button>
            </>
          ) : (
            <Button colorScheme="blue" onClick={() => setIsEditing(true)} width="100%">
              Edit Profile
            </Button>
          )}
        </Flex>
      </Flex>
    </Box>
  );
};

export default UserProfile;