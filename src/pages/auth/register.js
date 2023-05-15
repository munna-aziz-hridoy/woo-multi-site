import React, { useEffect, useState } from "react";

import {
  useAuthState,
  useCreateUserWithEmailAndPassword,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import toast from "react-hot-toast";

import {
  Box,
  Button,
  Card,
  Typography,
  Divider,
  CircularProgress,
} from "@mui/material";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/router";

import { COLOR } from "@/assets/constant";
import { Input, Divider as CustomDivider } from "@/components";
import auth from "@/firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import firestore from "@/firebase/firestore";

function Register() {
  const { push } = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [existUser] = useAuthState(auth);

  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const [updateProfile, updating] = useUpdateProfile(auth);

  const handleSubmit = () => {
    if (name && email && password) {
      createUserWithEmailAndPassword(email, password).then(() =>
        updateProfile({ displayName: name }).then((data) => {
          data && toast.success("Register successfull");
          addDoc(collection(firestore, "users"), { email });
        })
      );
    }
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
        {loading || updating ? (
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
              Welcome On board
            </Typography>
            <Typography
              variant="body2"
              fontWeight={400}
              fontSize={14}
              color="#bcbcbc"
            >
              Enter your information to sign up
            </Typography>

            <Input
              onChange={(e) => {
                setName(e.target.value);
              }}
              label="Name"
              required
            />
            <Input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              label="Email"
              required
            />
            <Input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
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
              Register
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
              <FcGoogle fontSize={26} /> Sign in with google
            </Button>
            <Divider />
            <Button
              onClick={() => push("/auth/login")}
              sx={{ color: COLOR.primary }}
            >
              Already have an account?
            </Button>
          </Box>
        )}
      </Card>
    </Box>
  );
}

export default Register;
