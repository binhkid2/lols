import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react"
import { useRouter } from "next/router";
import { Auth } from "aws-amplify";
import { useState } from "react"

export default function SimpleCard() {
  const router = useRouter();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
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
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={backgroundColor}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"} w = "90vw">Sign in to your account</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool <Link color={"blue.400"}>features</Link> ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={backgroundColor}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input type="email"
                 value={email}
              onChange={(event) => setEmail(event.target.value)}/>
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input type="password" 
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Checkbox>Remember me</Checkbox>
                <Link color={"blue.400"}>Forgot password?</Link>
              </Stack>
              <Button
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                onClick={handleSignin}
              >
                Sign in
              </Button>
              {errorMessage && (
                <Text color="red.500">{errorMessage}</Text>
              )}
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}
