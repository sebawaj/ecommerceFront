import React from "react";
import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";

export default function Auth() {
  let user = useSelector((state) => state.persistedReducer.user);
  let admin = useSelector((state) => state.persistedReducer.admin);
  if (user || admin) {
    return <Outlet />;
  }
  return <Navigate to={"/login"} />;
}
