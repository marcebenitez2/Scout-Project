import axios from "axios";
import { useEffect, useState } from "react";

export const fetchDataBase = (direction, setState, setLoading) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(direction);
        const data = response.data;
        setState(data);
        setLoading(false); 
      } catch (error) {
        console.log(error);
        setLoading(false); 
      }
    };

    fetchData();
  }, [direction, setState, setLoading]);
};
