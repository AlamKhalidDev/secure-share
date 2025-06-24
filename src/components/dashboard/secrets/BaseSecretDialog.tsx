import { Dialog, Box, Typography, Avatar, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";

interface BaseSecretDialogProps {
  open: boolean;
  onClose: () => void;
  headerColor: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  children: React.ReactNode;
  additionalHeaderContent?: React.ReactNode;
}

export function BaseSecretDialog({
  open,
  onClose,
  headerColor,
  icon,
  title,
  description,
  children,
  additionalHeaderContent,
}: BaseSecretDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 4,
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          boxShadow: "0 25px 50px rgba(0,0,0,0.2)",
          overflow: "scroll",
          maxHeight: "90vh",
          display: "flex",
          flexDirection: "column",
        },
      }}
      BackdropProps={{
        sx: {
          backgroundColor: "rgba(0,0,0,0.4)",
          backdropFilter: "blur(8px)",
        },
      }}
    >
      <Box
        sx={{
          background: headerColor,
          p: 4,
          position: "relative",
          flexShrink: 0,
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(10px)",
          },
        }}
      >
        <Box sx={{ position: "relative", zIndex: 1 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 2,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Avatar
                sx={{
                  width: 56,
                  height: 56,
                  background: "rgba(255, 255, 255, 0.2)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                }}
              >
                {icon}
              </Avatar>
              <Box>
                <Typography
                  variant="h5"
                  fontWeight="bold"
                  sx={{ color: "white", mb: 0.5 }}
                >
                  {title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "rgba(255,255,255,0.8)" }}
                >
                  {description}
                </Typography>
              </Box>
            </Box>
            <IconButton
              onClick={onClose}
              sx={{
                color: "white",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                },
              }}
            >
              <Close />
            </IconButton>
          </Box>
          {additionalHeaderContent}
        </Box>
      </Box>

      {children}
    </Dialog>
  );
}
