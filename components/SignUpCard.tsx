import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
} from "@chakra-ui/react"
import { useRouter } from "next/router";
import { useState } from "react"
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons"
import { Auth } from 'aws-amplify';
import React from "react";
export default function SignupCard() {
  const router = useRouter();
  const [userName,setUserName] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [code, setCode] = useState("");
  const [confirmMode, setConfirmMode] = useState(false);
  const [errorMessage, setErrorMessage] = useState("")
  const [loading, setLoading] = useState(false);
  const lightColor = "gray.50";
  const darkColor = "gray.800";

  // Call the hook unconditionally and move conditional logic inside
  const backgroundColor = useColorModeValue(lightColor, darkColor);
  async function  handleSignin (){
    try {
      const user = await Auth.signIn(email, password);
      setLoading(true);
     router.push("/dashboard")
    } 
    catch (err:any) {
      console.log('error signing in', err);
      setErrorMessage(err.message);
    }
  }
  const handleSignup = async () => {
    setLoading(true)
    try {
        const { user } = await Auth.signUp({
           
           username : email,
            password : password,
          // autoSignIn: { // optional - enables auto sign in after user is confirmed
           //    enabled: true,
          //  }
        });
        console.log("Login Success");
        setConfirmMode(true)
        setLoading(false)
     setErrorMessage("")
    } catch (error:any) {
        console.log('error signing up:', error);
      setErrorMessage(error.message);
    }
}
async function confirmSignUp() {
  setLoading(true)
  try {
    const newuser = await Auth.confirmSignUp(email, code);
    setConfirmMode(false)
    handleSignin()
  } catch (error:any) {
      console.log('error confirming sign up', error);
      setErrorMessage(error.message);
  }
}
if (loading) {
  return <div>Loading...</div>;
}
  return (
    <div>
   { confirmMode ? (

<Flex
minH={"100vh"}
align={"center"}
justify={"center"}
bg={backgroundColor }
>
<Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
  <Stack align={"center"}>
      <Heading fontSize={"4xl"} textAlign={"center"} w = "90vw">
        We just send you a messenger
      </Heading>
      <Text fontSize={"lg"} color={"gray.600"}>
        to your email
      </Text>
    </Stack>
    <Box
      rounded={"lg"}
      bg={backgroundColor}
      boxShadow={"lg"}
      p={8}
    >
      <Stack spacing={4}>
        
      <FormControl id="code" >
    <FormLabel>Verify Code</FormLabel>
    <Input type="text" 
    value={code}
    onChange={(event) => setCode(event.target.value)}
    />
     <Button
                size="lg"
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                onClick={confirmSignUp}
              >
                Confirm
              </Button>
             
  </FormControl>
  {errorMessage && (
                <Text color="red.500">{errorMessage}</Text>
              )}
   
        
      </Stack>
    </Box>
  </Stack>
</Flex>


    )
    :
    (
    <Flex
    minH={"100vh"}
    align={"center"}
    justify={"center"}
    bg={backgroundColor }
  >
    <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
      <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"} w = "90vw">
            Sign up
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={backgroundColor}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            
              
                <FormControl id="userName" >
                  <FormLabel>User Name</FormLabel>
                  <Input type="text" 
                  value={userName}
                  onChange={(event) => setUserName(event.target.value)}
                 
                  />
                </FormControl>
           
            <FormControl id="email" isRequired >
              <FormLabel>Email address</FormLabel>
              <Input type="email" 
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              />
               
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel >Password</FormLabel>
              <InputGroup >
                <Input 
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                 type={showPassword ? "text" : "password"} />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                size="lg"
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                onClick={handleSignup}
              >
                Sign up
              </Button>
              {errorMessage && (
                <Text color="red.500">{errorMessage}</Text>
              )}
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>
                Already a user? <Link color={"blue.400"}>Login</Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
    )}
    </div>
  )
}