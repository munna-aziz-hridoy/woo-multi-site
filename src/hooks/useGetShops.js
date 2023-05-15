import firestore from "@/firebase/firestore";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useState, useEffect } from "react";

const useGetShops = (userId) => {
  const [shops, setShops] = useState([]);

  const [refetch, setRefetch] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userId) {
      setLoading(true);
      const q = query(
        collection(firestore, "sites"),
        where("user_id", "==", userId)
      );

      getDocs(q).then((data) => {
        const sites = data.docs.map((item) => item.data());

        setShops(sites);
        setLoading(false);
      });
    }
  }, [userId, refetch]);

  return { shops, loading, refetch: setRefetch };
};

export default useGetShops;
