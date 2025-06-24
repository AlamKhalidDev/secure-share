import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Avatar,
  Typography,
  Box,
} from "@mui/material";
import { Delete } from "@mui/icons-material";

interface DeleteConfirmationDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading: boolean;
}

export const DeleteConfirmationDialog = ({
  open,
  onClose,
  onConfirm,
  isLoading,
}: DeleteConfirmationDialogProps) => (
  <Dialog
    open={open}
    onClose={onClose}
    PaperProps={{
      sx: {
        borderRadius: 3,
        background: "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(20px)",
      },
    }}
  >
    <DialogTitle sx={{ pb: 1 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Avatar
          sx={{
            width: 40,
            height: 40,
            background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
          }}
        >
          <Delete />
        </Avatar>
        <Typography variant="h6" fontWeight="bold">
          Delete Secret
        </Typography>
      </Box>
    </DialogTitle>
    <DialogContent>
      <Typography color="text.secondary" sx={{ lineHeight: 1.6 }}>
        Are you sure you want to delete this secret? This action cannot be
        undone and the secret will be permanently removed from your account.
      </Typography>
    </DialogContent>
    <DialogActions sx={{ p: 3, pt: 1 }}>
      <Button
        onClick={onClose}
        sx={{
          borderRadius: 2,
          textTransform: "none",
          fontWeight: 600,
        }}
      >
        Cancel
      </Button>
      <Button
        onClick={onConfirm}
        variant="contained"
        disabled={isLoading}
        sx={{
          borderRadius: 2,
          textTransform: "none",
          fontWeight: 600,
          background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
          "&:hover": {
            background: "linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)",
          },
        }}
      >
        {isLoading ? "Deleting..." : "Delete Secret"}
      </Button>
    </DialogActions>
  </Dialog>
);
