"use client";

import { useState } from "react";
import {
  QueryClientProvider,
  QueryClient,
  QueryCache,
} from "@tanstack/react-query";
import { ReactQueryStreamedHydration } from "@tanstack/react-query-next-experimental";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import useAuthStore from "@/utils/useAuthStore";
import { toast } from "react-toastify";

export default function ReactQueryProvider({
  children,
}: React.PropsWithChildren) {
  const router = useRouter();
  const { setToken, setRefreshToken, setUserId, setUserRole } = useAuthStore();
  const [client] = useState(
    new QueryClient({
      queryCache: new QueryCache({
        onError: (
          error: AxiosError<{ response: { code: number; reason: string } }>
        ) => {
          console.log(error);

          // Unauthrized || error.response.data.response.code === 5204 => No token provided
          if (
            error.status === 401 ||
            error.response.data.response.code === 5204
          ) {
            setUserId(undefined);
            setUserRole(undefined);
            setToken(undefined);
            setRefreshToken(undefined);
            router.replace("/login");
          }
        },
      }),
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          refetchOnMount: false,
          retry: 1,
        },
        mutations: {
          retry: 0,
          onError: (
            error: AxiosError<{
              response: { code: number; reason: string };
              message?: string;
            }>
          ) => {
            // Unauthrized
            if (error.status === 401) {
              setToken(undefined);
              setRefreshToken(undefined);
              router.replace("/login");
            }

            console.log("error >>>", error);

            toast(
              error.response?.data?.response?.reason ||
                error.response?.data?.message ||
                "Error",
              {
                type: "error",
              }
            );
          },
        },
      },
    })
  );

  return (
    <QueryClientProvider client={client}>
      <ReactQueryStreamedHydration>{children}</ReactQueryStreamedHydration>
    </QueryClientProvider>
  );
}
