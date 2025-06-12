"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import styles from "../../styles.module.scss";
import "../../../styles/variable.css";
import "../../../styles/reset.css";
import "../../../styles/global.css";
import { Button } from "@mui/material";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  const router = useRouter();
  useEffect(() => {
    // Log the error to an error reporting service
    console.log(error.cause);
    console.log(error.digest);
    console.log(error.message);
    console.log(error.name);
    console.log(error.stack);

    router.replace("/device/list");
  }, [error]);

  return <div />;
}
