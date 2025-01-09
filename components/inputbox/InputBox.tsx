import { CSSProperties, ReactNode } from "react";
import styles from "./styles.module.scss";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import { styled, Tooltip, tooltipClasses, TooltipProps } from "@mui/material";

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
  style,
}: ChildComponentProps & { warning?: boolean; style?: CSSProperties }) {
  return (
    <div
      className={
        warning ? `${styles.title} ${styles.warning}` : `${styles.title}`
      }
      style={style}
    >
      {children}
    </div>
  );
};

InputBox.Info = function Info({
  tooltipText,
  placement = "top",
}: {
  tooltipText?: ReactNode;
  placement?: "top" | "bottom";
}) {
  console.log(tooltipText);
  return (
    <div className={styles.info}>
      <CustomWidthTooltip
        title={tooltipText}
        placement={placement}
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
      </CustomWidthTooltip>
    </div>
  );
};

InputBox.Number = function Number({ children }: ChildComponentProps) {
  return <div className={styles.number}>{children}</div>;
};

InputBox.Body = function Body({ children }: ChildComponentProps) {
  return <div className={styles.body}>{children}</div>;
};

const CustomWidthTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 414,
    fontSize: "13px",
    padding: "12px",
    background: "#202024E6",
  },
});
