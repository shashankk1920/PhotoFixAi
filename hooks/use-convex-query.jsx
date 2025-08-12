"use client";

import React, { useState, useEffect } from "react";
import { useQuery } from "convex/react";
import { useMutation } from "convex/react";
import { toast } from "sonner";

export const useConvexQuery = (query, ...args) =>{

    const result = useQuery(query, ...args);
    const [data, setData] = useState(undefined);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(undefined);


    useEffect(() =>{
       if(result == undefined){
        setIsLoading(true);
       }else{
        try{
            setData(result);
            setError(null);
        }catch(err){
            setError(err);
            toast.error("An error occurred while fetching data");
        }finally{
            setIsLoading(false);
        }
       }
    },
    [result]);

    return {
        data,
        isLoading,
        error,
    }

}

export const useConvexMutation = (mutation) =>{

    const mutationFn = useMutation(mutation );
    const [data, setData] = useState(undefined);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(undefined);

const mutate = async (...args) => {
    setIsLoading(true);
    setError(null);
    try{
        const response = await mutationFn(...args);
    }catch(err){
        setError(err);
        toast.error("An error occurred while mutating data ");
    }finally{
        setIsLoading(false);
    }
};

return { mutate, data, isLoading, error  };

}