import auth from "@/firebase/auth";
import useGetShops from "@/hooks/useGetShops";
import useGetUserId from "@/hooks/useGetUserId";
import React, { createContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

export const AllContext = createContext(null);

function AllContextProvider({ children }) {
  const [user] = useAuthState(auth);

  const {
    userDbId,
    loading: userLoading,
    refetch: userRefetch,
    userSites,
  } = useGetUserId(user?.email);
  const {
    shops,
    loading: shopLoading,
    refetch: shopRefetch,
  } = useGetShops(userDbId);

  return (
    <AllContext.Provider
      value={{
        userDbId,
        userLoading,
        userRefetch,
        userSites,
        shops,
        shopLoading,
        shopRefetch,
      }}
    >
      {children}
    </AllContext.Provider>
  );
}

export default AllContextProvider;
