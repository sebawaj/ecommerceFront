import React from "react";
import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";

export default function AuthAdmin() {
  let admin = useSelector((state) => state.persistedReducer.admin);
  if (admin) {
    return <Outlet />;
  }
  return <Navigate to={"/admin"} />;
}
