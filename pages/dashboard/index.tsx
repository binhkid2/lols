import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react"
import { useState } from 'react';
import { useRouter } from 'next/router';
import { Auth, withSSRContext } from 'aws-amplify';
import NavBarAuth from "@/components/NavBarAuth";
type Props = {
  user: {
    username: string;
    email: string;
  };
};
export async function getServerSideProps(context:any) {
  const { Auth } = withSSRContext(context);
  
  try {
    const user = await Auth.currentAuthenticatedUser();
    return {
      props: {
        user: {
          username: user.username,
          email: user.attributes.email,
          // etc.
        },
      },
    };
  } catch (error) {
    console.log(error);
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }
}

const Dashboard = ({ user }: Props) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    setLoading(true);
    await Auth.signOut();
    router.push('/signin');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <NavBarAuth/>
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      
    >

      <div>
        <h1>Welcome {user.username}!</h1>
        <p>Your email address is {user.email}.</p>
        <Button
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                onClick={handleLogout}
              >
                LogOut
              </Button>
            
      
      </div>
      </Flex>
      </>
  );
};

export default Dashboard;
