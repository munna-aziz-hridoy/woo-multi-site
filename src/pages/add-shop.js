import React, { useContext, useState } from "react";

import { v4 as uuid } from "uuid";

import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Grid,
} from "@mui/material";

import { COLOR } from "@/assets/constant";
import { Input, Select } from "@/components";

import firestore from "@/firebase/firestore";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";

import { toast } from "react-hot-toast";

import { AllContext } from "@/context/allContext";

const shop_types = ["General", "Catelog"];

function AddShop() {
  const [shop_name, setShop_name] = useState("");
  const [shop_url, setShop_url] = useState("");
  const [woo_ck, setWoo_ck] = useState("");
  const [woo_cs, setWoo_cs] = useState("");

  const [loading, setLoading] = useState(false);

  const [product_type, setProduct_type] = useState(shop_types[0]);

  const {
    userDbId,
    userLoading,
    userRefetch,
    userSites,

    shopLoading,
    shopRefetch,
  } = useContext(AllContext);

  const handleSubmit = () => {
    const hex_id = parseInt(uuid().replace(/-/g, "").substr(0, 6), 16);
    setLoading(true);
    try {
      addDoc(collection(firestore, "sites"), {
        shop_name,
        product_type,
        domain: shop_url,
        ck: woo_ck,
        cs: woo_cs,
        user_id: userDbId,
        id: hex_id,
      }).then((data) => {
        const shop_id = data.id;
        const docRef = doc(firestore, "users", userDbId);
        updateDoc(docRef, { sites: [...userSites, shop_id] }).then((data) => {
          userRefetch((prev) => !prev);
          setShop_name("");
          setProduct_type(shop_types[0]);
          setShop_url("");
          setWoo_ck("");
          setWoo_cs("");
          toast.success("Shop Created");
          shopRefetch((prev) => !prev);
        });
      });
    } catch (error) {
      toast.error("There is some error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      component="div"
      height="100%"
      display="flex"
      justifyContent="center"
      alignItems="flex-start"
    >
      <Card
        sx={{
          boxShadow: "none",
          borderRadius: "16px",
          //   minHeight: "100%",
          minWidth: "100%",
        }}
      >
        <CardHeader title="Add Shop" sx={{ textAlign: "center" }} />

        <CardContent>
          {loading || userLoading || shopLoading ? (
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
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Input
                  onChange={(e) => setShop_name(e.target.value)}
                  label="Shop Name"
                  required
                  value={shop_name}
                />
              </Grid>
              <Grid item xs={6}>
                <Input
                  onChange={(e) => setShop_url(e.target.value)}
                  label="Url"
                  required
                  value={shop_url}
                />
              </Grid>
              <Grid item xs={6}>
                <Input
                  onChange={(e) => setWoo_ck(e.target.value)}
                  label="Woo CK"
                  required
                  value={woo_ck}
                />
              </Grid>
              <Grid item xs={6}>
                <Input
                  onChange={(e) => setWoo_cs(e.target.value)}
                  label="Woo CS"
                  required
                  value={woo_cs}
                />
              </Grid>
              <Grid item xs={6}>
                <Select
                  onChange={(e) => setProduct_type(e.target.value)}
                  options={shop_types}
                  value={product_type}
                  required
                />
              </Grid>
              <Grid item xs={6}>
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
                  Add Shop
                </Button>
              </Grid>
            </Grid>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}

export default AddShop;
