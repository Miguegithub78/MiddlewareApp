import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const CountryState = () => {
   const dispatch = useDispatch()
  useEffect(() => {
   dispatch(getCountryStateAction())


  }, []);
  return <div></div>;
};

export default CountryState;
