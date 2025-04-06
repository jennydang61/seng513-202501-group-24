import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  Link as ChakraLink,
  Container,
} from "@chakra-ui/react";
import { login } from "../lib/api";

const Login = () => {
//   const location = useLocation();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const redirectUrl = location.state?.redirectUrl || "/";

  const {
    mutate: signIn,
    isPending,
    isError,
  } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      navigate(redirectUrl, {
        replace: true, // prevents going back to the login page when back is pressed after logging in
      });
    },
  });

  return (
    <Flex minH="100vh" align="center" justify="center">
      <Container mx="auto" maxW="md" py={12} px={6} textAlign="center">
        <Heading fontSize="4xl" mb={8}>
          Sign in to your account
        </Heading>
        <Box rounded="lg" bg="gray.700" boxShadow="lg" p={8}>
          {isError && (
            <Box mb={3} color="red.400">
              Invalid username or password
            </Box>
          )}
          <Stack spacing={4}>
            <FormControl id="username">
              <FormLabel>Username</FormLabel>
              <Input
                type="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoFocus
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => // allows login when enter is pressed from password
                  e.key === "Enter" && signIn({ username, password })
                }
              />
            </FormControl>

            {/* <ChakraLink
              as={Link}
              to="/password/forgot"
              fontSize="sm"
              textAlign={{
                base: "center",
                sm: "right",
              }}
            >
              Forgot password?
            </ChakraLink> */}
            <Button
              my={2}
            //   isLoading={isPending}
              isDisabled={!username || password.length < 8}
              onClick={() => signIn({ username, password })}
            >
              Sign in
            </Button>
            <Text align="center" fontSize="sm" color="text.muted">
              Don't have an account?{" "}
              <ChakraLink as={Link} to="/register">
                Sign up
              </ChakraLink>
            </Text>
          </Stack>
        </Box>
      </Container>
    </Flex>
  );
};
export default Login;
