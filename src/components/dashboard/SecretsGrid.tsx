import {
  Grid,
  Box,
  CircularProgress,
  Typography,
  Alert,
  Card,
  CardContent,
  Button,
  Avatar,
} from "@mui/material";
import { Secret } from "@/types/dashboard";
import { SecretCard } from "./SecretCard";
import { Add, Security } from "@mui/icons-material";

interface SecretsGridProps {
  secrets: Secret[];
  isLoading: boolean;
  error: unknown;
  searchTerm: string;
  onEdit: (secret: Secret) => void;
  onDelete: (secret: Secret) => void;
  onCopy: (secretId: string) => void;
  copiedId: string | null;
  onCreate: () => void;
}

export const SecretsGrid = ({
  secrets,
  isLoading,
  error,
  searchTerm,
  onEdit,
  onDelete,
  onCopy,
  copiedId,
  onCreate,
}: SecretsGridProps) => {
  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" py={8}>
        <Box textAlign="center">
          <CircularProgress size={60} sx={{ color: "white", mb: 2 }} />
          <Typography variant="h6" color="white">
            Loading your secrets...
          </Typography>
        </Box>
      </Box>
    );
  }

  if (error) {
    return (
      <Alert
        severity="error"
        sx={{
          mb: 4,
          borderRadius: 3,
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(20px)",
        }}
      >
        Error loading secrets
      </Alert>
    );
  }

  if (secrets.length === 0) {
    return (
      <Card
        sx={{
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          borderRadius: 4,
          boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
        }}
      >
        <CardContent sx={{ textAlign: "center", py: 8 }}>
          <Avatar
            sx={{
              width: 80,
              height: 80,
              mx: "auto",
              mb: 3,
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            }}
          >
            <Security sx={{ fontSize: 40 }} />
          </Avatar>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            {searchTerm ? "No secrets found" : "No secrets yet"}
          </Typography>
          <Typography
            color="text.secondary"
            sx={{ mb: 4, maxWidth: 400, mx: "auto" }}
          >
            {searchTerm
              ? "Try adjusting your search terms to find what you're looking for"
              : "Create your first secret to get started with secure message sharing"}
          </Typography>
          {!searchTerm && (
            <Button
              variant="contained"
              size="large"
              startIcon={<Add />}
              onClick={onCreate}
              sx={{
                borderRadius: 3,
                px: 4,
                py: 1.5,
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                boxShadow: "0 8px 25px rgba(102, 126, 234, 0.3)",
                textTransform: "none",
                fontWeight: 600,
                "&:hover": {
                  background:
                    "linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)",
                  transform: "translateY(-2px)",
                  boxShadow: "0 12px 35px rgba(102, 126, 234, 0.4)",
                },
                transition: "all 0.3s ease",
              }}
            >
              Create Your First Secret
            </Button>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <Grid container spacing={3}>
      {secrets.map((secret, index) => (
        <SecretCard
          key={secret.id}
          secret={secret}
          onEdit={onEdit}
          onDelete={onDelete}
          onCopy={onCopy}
          copiedId={copiedId}
          index={index}
        />
      ))}
    </Grid>
  );
};
