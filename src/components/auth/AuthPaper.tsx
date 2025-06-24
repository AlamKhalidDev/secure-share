import { Fade, Paper } from "@mui/material";
import { ReactNode } from "react";

interface AuthPaperProps {
  children: ReactNode;
}

export const AuthPaper = ({ children }: AuthPaperProps) => (
  <Fade in timeout={800}>
    <Paper
      elevation={0}
      sx={{
        borderRadius: 4,
        background: "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        boxShadow: "0 25px 50px rgba(0,0,0,0.2)",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {children}
    </Paper>
  </Fade>
);
