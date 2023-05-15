import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  Typography,
  Divider,
  CircularProgress,
} from "@mui/material";
import { COLOR } from "@/assets/constant";

import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/router";
import {
  useAuthState,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";

import { Input, Divider as CustomDivider } from "@/components";
import toast from "react-hot-toast";
import auth from "@/firebase/auth";

function Login() {
  const { push } = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [existUser] = useAuthState(auth);

  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const handleSubmit = () => {
    signInWithEmailAndPassword(email, password).then((data) => {
      if (data?.user) {
        toast.success("Login successfull");
      }
    });
  };

  useEffect(() => {
    if (error) {
      toast.error(error.message.split("(")[1].split(")")[0]);
    }
  }, [error]);

  if (existUser || user) {
    push("/");
    return null;
  }

  return (
    <Box
      component="div"
      display="flex"
      justifyContent="center"
      alignContent="center"
      minHeight="80vh"
    >
      <Card sx={{ minWidth: "400px", padding: 3, borderRadius: 3 }}>
        {loading ? (
          <Box
            component="div"
            height="100%"
            width="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <CircularProgress color="primary" />
          </Box>
        ) : (
          <Box
            width="100%"
            component="div"
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            gap={2}
          >
            <Typography
              variant="body1"
              fontWeight={600}
              fontSize={20}
              color={COLOR.primary}
            >
              Welcome Back
            </Typography>
            <Typography
              variant="body2"
              fontWeight={400}
              fontSize={14}
              color="#bcbcbc"
            >
              Enter your credential to login
            </Typography>

            <Input
              onChange={(e) => setEmail(e.target.value)}
              label="Email"
              required
            />
            <Input
              onChange={(e) => setPassword(e.target.value)}
              label="Password"
              required
            />
            <Button
              onClick={handleSubmit}
              fullWidth
              variant="contained"
              sx={{
                backgroundColor: COLOR.primary,
                "&:hover": {
                  backgroundColor: COLOR.primary_acent,
                  color: COLOR.primary,
                },
              }}
            >
              Login
            </Button>
            <CustomDivider />
            <Button
              fullWidth
              size="small"
              variant="outlined"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                color: COLOR.primary,
                borderColor: COLOR.primary,
              }}
            >
              <FcGoogle /> Sign in with google
            </Button>
            <Divider />
            <Button
              onClick={() => push("/auth/register")}
              sx={{ color: COLOR.primary }}
            >
              Don't have a account?
            </Button>
          </Box>
        )}
      </Card>
    </Box>
  );
}

export default Login;
