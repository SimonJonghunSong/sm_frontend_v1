"use client"; // Error components must be Client Components

import { useEffect } from "react";
import "../styles/variable.css";
import "../styles/reset.css";
import "../styles/global.css";
import styles from "./styles.module.scss";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

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
  }, [error]);

  return (
    <div className={styles.notFound}>
      <p>OOPS!</p>
      <span>ERROR OCCURRED</span>
      <Button variant="contained" onClick={() => router.back()}>
        Go Back
      </Button>
    </div>
  );
}
