import { ReactNode } from "react";
import styles from "./styles.module.scss";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import { Tooltip } from "@mui/material";

interface InputBoxProps {
  children: ReactNode;
}

interface ChildComponentProps {
  children: ReactNode;
}

export default function InputBox({ children }: InputBoxProps) {
  return <div className={styles.inputBox}>{children}</div>;
}

InputBox.Head = function Head({ children }: ChildComponentProps) {
  return <div className={styles.head}>{children}</div>;
};

InputBox.Title = function Title({
  children,
  warning = false,
}: ChildComponentProps & { warning?: boolean }) {
  return (
    <div
      className={
        warning ? `${styles.title} ${styles.warning}` : `${styles.title}`
      }
    >
      {children}
    </div>
  );
};

InputBox.Info = function Info({ tooltipText }) {
  return (
    <div className={styles.info}>
      <Tooltip
        title={tooltipText}
        placement="top"
        slotProps={{
          popper: {
            modifiers: [
              {
                name: "offset",
                options: {
                  offset: [0, -12],
                },
              },
            ],
          },
        }}
      >
        <ErrorOutlineOutlinedIcon
          sx={{ fontSize: "22px", color: "var(--grey5)" }}
        />
      </Tooltip>
    </div>
  );
};

InputBox.Number = function Number({ children }: ChildComponentProps) {
  return <div className={styles.number}>{children}</div>;
};

InputBox.Body = function Body({ children }: ChildComponentProps) {
  return <div className={styles.body}>{children}</div>;
};
