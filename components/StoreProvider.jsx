"use client";

import React, { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import store from "../store/store";
import { checkLoginStatus } from "../lib/auth";

function AuthInitializer({ children }) {
  const dispatch = useDispatch();
  useEffect(() => {
    checkLoginStatus(dispatch);
  }, [dispatch]);
  return <>{children}</>;
}

export default function StoreProvider({ children }) {
  return (
    <Provider store={store}>
      <AuthInitializer>{children}</AuthInitializer>
    </Provider>
  );
}
