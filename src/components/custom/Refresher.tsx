"use client"
import React, { useCallback, useEffect, useRef } from 'react'
import * as jose from 'jose';

const Refresher = ({ children }: { children: React.ReactNode }) => {
  const timeoutId = useRef<number | null>(null);

  // --- Fetch new access token from API ---
  //Third execution flow starts from here
  const getAccessToken = async () => {
    const res = await fetch("/api/auth/accessToken");//Here we are fetching accessToken from path "/src/app/api/auth/accessToken" where we are calling GET function


    if (!res.ok) {
      return;
    }
    const accessToken = await res.json();
    console.log("accessToken", accessToken);
    return accessToken.token;
  };

  // --- Refresh Access Token ---
  //fourth execution flow starts from here
  const refreshAccessToken = useCallback(async () => {
    try {
      console.log("Refreshing access token...");
      const res = await fetch("/api/auth/refreshToken", { method: 'POST' });//Here we are fetching accessToken from path "/src/app/api/auth/refreshToken" where we are calling POST function

      if (!res.ok) {
        console.log('Failed to refresh access token');
        return;
      }
    } catch (err: any) {
      console.error(`Error while refreshing the token`, err);
    }

    // restart the cycle after refreshing
    startRefresh();
  }, []);

  // --- Start refresh cycle ---
  //second execution flow starts from here
  const startRefresh = useCallback(async () => {
    if (timeoutId.current !== null) {
      clearTimeout(timeoutId.current);
    }

    try {
      const accessToken = await getAccessToken();//callback
      if (!accessToken) return;

      const token = jose.decodeJwt(accessToken);
      console.log("decodeAccessToken", token);

      const exp = token.exp! * 1000; // convert to ms
      const currentTime = Date.now();
      const refreshTime = exp - currentTime - 5000; // refresh 5s before expiry

      console.log(`Current time: ${new Date(currentTime).toISOString()}`);
      console.log(`Token expiry time: ${new Date(exp).toISOString()}`);
      console.log(`Scheduled refresh time: ${new Date(currentTime + refreshTime).toISOString()}`);

      // schedule refresh
      timeoutId.current = window.setTimeout(() => {
        refreshAccessToken();//callback
      }, refreshTime);
    } catch (error) {
      console.error("Error decoding access token", error);
    }
  }, [refreshAccessToken]);

  // --- Initialize refresh cycle ---
  //First execution flow starts from here
  useEffect(() => {
    startRefresh();
    return () => {
      if (timeoutId.current !== null) {
        clearTimeout(timeoutId.current);
      }
    };
  }, [startRefresh]);

  return <>{children}</>;
};

export default Refresher;
