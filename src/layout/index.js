import React, { useContext, useState } from "react";
import { styled } from "@mui/material/styles";

import {
  Box,
  Drawer,
  CssBaseline,
  Toolbar,
  List,
  Typography,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Button,
  Avatar,
  Divider,
  CircularProgress,
} from "@mui/material";

import MuiAppBar from "@mui/material/AppBar";

import { Toaster } from "react-hot-toast";

import { RiMenuFoldFill, RiMenuUnfoldFill } from "react-icons/ri";
import { FaStore } from "react-icons/fa";
import { HiPlusSm, HiLogout } from "react-icons/hi";

import { COLOR } from "@/assets/constant";
import { useRouter } from "next/router";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";

import defaultAvatar from "@/assets/profile.png";
import auth from "@/firebase/auth";

import { AllContext } from "@/context/allContext";

const drawerWidth = 220;

// styled component

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    minHeight: "90vh",
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

// main component

export default function Layout({ children }) {
  const [open, setOpen] = useState(true);
  const [openDropDown, setOpenDropDown] = useState(false);

  const { push, pathname, query } = useRouter();

  const [signOut] = useSignOut(auth);
  const [user] = useAuthState(auth);

  const { userLoading, shops, shopLoading } = useContext(AllContext);

  // jsx

  if (pathname.includes("auth")) {
    return (
      <Main open={open} sx={{ padding: "0 10px", mt: 6.5 }}>
        <Box
          component="div"
          sx={{
            height: "100%",
            backgroundColor: COLOR.offset,
            borderRadius: "16px",
            padding: 2,
          }}
        >
          {children}
          <Toaster />
        </Box>
      </Main>
    );
  }

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        open={open}
        sx={{
          backgroundColor: "#fff",
          boxShadow: "none !important",
          minHeight: "50px !important",
        }}
      >
        <Toolbar
          sx={{
            minHeight: "50px !important",
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box display="flex" alignItems="center">
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={() => setOpen((prev) => !prev)}
              edge="start"
              sx={{
                mr: 2,
                backgroundColor: COLOR.primary_acent,
                color: COLOR.primary,
                borderRadius: "8px",
                "&:hover": {
                  backgroundColor: COLOR.primary,
                  color: COLOR.primary_acent,
                },
              }}
            >
              {open ? <RiMenuFoldFill /> : <RiMenuUnfoldFill />}
            </IconButton>
          </Box>
          <Typography variant="h6" color={COLOR.primary}>
            Woo multi product manage
          </Typography>

          <Box
            component="div"
            position="relative"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            paddingY="4px"
          >
            <Avatar
              onClick={() => setOpenDropDown((prev) => !prev)}
              alt="Remy Sharp"
              src={user?.photoURL || defaultAvatar.src}
              sx={{ cursor: "pointer" }}
            />
            <Typography
              variant="body1"
              fontWeight={400}
              fontSize={12}
              color="#727272"
            >
              {user?.displayName || "No Names"}
            </Typography>
            {openDropDown && (
              <Box
                component="div"
                position="absolute"
                left="-147px"
                top={50}
                bgcolor="#fff"
                padding={2}
                borderRadius={3}
                width={198}
              >
                <Typography
                  variant="body1"
                  fontWeight={600}
                  fontSize={18}
                  color="#000"
                  textTransform="capitalize"
                >
                  {user?.displayName || "No Names"}
                </Typography>
                <Typography
                  variant="body1"
                  fontWeight={400}
                  fontSize={14}
                  color="#727272"
                >
                  {user?.email}
                </Typography>
                <Divider />
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    signOut().then(() => push("/auth/login"));
                  }}
                  sx={{
                    color: COLOR.primary,
                    borderColor: COLOR.primary,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    textTransform: "capitalize",
                    padding: 0,
                    marginTop: 1,
                  }}
                >
                  Logout
                  <HiLogout />
                </Button>
              </Box>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          padding: 1,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
          "& .MuiPaper-root": {
            border: "none",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader
          sx={{
            justifyContent: "center",
            mt: 5,
          }}
        >
          <Typography variant="h6" textAlign="center">
            Shop List
          </Typography>
        </DrawerHeader>

        <List>
          {shopLoading || userLoading ? (
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
            shops?.map((shop, index) => (
              <ListItem onClick={() => push(`/shop/${shop?.id}`)} key={index}>
                <ListItemButton
                  sx={{
                    backgroundColor:
                      shop?.id === parseInt(query?.shop_id)
                        ? COLOR.primary
                        : COLOR.primary_acent,
                    borderRadius: 3,
                    color:
                      shop?.id === parseInt(query?.shop_id)
                        ? COLOR.primary_acent
                        : "#292929",
                    "&:hover": {
                      backgroundColor: COLOR.primary,
                      color: COLOR.primary_acent,
                      "& .MuiListItemIcon-root": {
                        color: COLOR.primary_acent,
                      },
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: "30px",
                      color:
                        shop?.id === parseInt(query?.shop_id)
                          ? COLOR.primary_acent
                          : "#5c5c5c",
                    }}
                  >
                    <FaStore />
                  </ListItemIcon>
                  <ListItemText
                    primary={shop?.shop_name}
                    sx={{ whiteSpace: "nowrap", overflow: "hidden" }}
                  />
                </ListItemButton>
              </ListItem>
            ))
          )}
          <ListItem>
            <ListItemButton
              sx={{
                backgroundColor: pathname.includes("add-shop")
                  ? COLOR.primary
                  : COLOR.primary_acent,
                borderRadius: 3,
                color: pathname?.includes("add-shop")
                  ? COLOR.primary_acent
                  : "#292929",
                "&:hover": {
                  backgroundColor: COLOR.primary,
                  color: COLOR.primary_acent,
                  "& .MuiListItemIcon-root": {
                    color: COLOR.primary_acent,
                  },
                },
              }}
              onClick={() => push("/add-shop")}
            >
              <ListItemIcon
                sx={{
                  minWidth: "30px",
                  color: pathname.includes("add-shop")
                    ? COLOR.primary_acent
                    : "#5c5c5c",
                }}
              >
                <HiPlusSm fontSize={30} />
              </ListItemIcon>
              <ListItemText
                primary={"Add Shop"}
                sx={{ whiteSpace: "nowrap", overflow: "hidden" }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Main open={open} sx={{ padding: "0 10px", mt: 9 }}>
        <Box
          component="div"
          sx={{
            height: "100%",
            backgroundColor: COLOR.offset,
            borderRadius: "16px",
            padding: 2,
          }}
        >
          {children}
          <Toaster />
        </Box>
      </Main>
    </Box>
  );
}
