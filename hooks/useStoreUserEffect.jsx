import { useUser } from "@clerk/nextjs";
import { useConvexAuth } from "convex/react";
import { useEffect, useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../convex/_generated/api";

export default function useStoreUser() {
  const { isAuthenticated, isLoading: convexLoading } = useConvexAuth();
  const { user, isLoaded: clerkLoaded } = useUser();
  // When this state is set we know the server
  // has stored the user.
  const [userId, setUserId] = useState(null);
  const [isStoring, setIsStoring] = useState(false);
  const storeUser = useMutation(api.users.store);
  
  // Call the `storeUser` mutation function to store
  // the current user in the `users` table and return the `Id` value.
  useEffect(() => {
    // If the user is not authenticated or if Convex is still loading, don't do anything
    if (!isAuthenticated || convexLoading || !clerkLoaded) {
      return;
    }
    
    // Store the user in the database.
    // Recall that `storeUser` gets the user information via the `auth`
    // object on the server. You don't need to pass anything manually here.
    async function createUser() {
      setIsStoring(true);
      try {
        const id = await storeUser();
        setUserId(id);
      } catch (error) {
  // ...removed console.error...
      } finally {
        setIsStoring(false);
      }
    }
    createUser();
    return () => {
      setUserId(null);
      setIsStoring(false);
    };
    // Make sure the effect reruns if the user logs in with
    // a different identity
  }, [isAuthenticated, storeUser, user?.id, convexLoading, clerkLoaded]);
  
  // Overall loading state - true if any part is loading
  const isLoading = convexLoading || !clerkLoaded || isStoring;
  
  return { userId, isLoading };
}





