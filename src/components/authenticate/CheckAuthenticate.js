import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { Box, CircularProgress } from "@mui/material";
import auth from "@/firebase/auth";

function CheckAuthenticate({ children }) {
  const { push } = useRouter();

  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    if (!user) {
      push("/auth/login");
      return null;
    }
  }, []);

  if (loading) {
    return (
      <Box
        component="div"
        height="100%"
        width="100%"
        minHeight="90vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <CircularProgress color="primary" />
      </Box>
    );
  }

  return children;
}

export default CheckAuthenticate;
