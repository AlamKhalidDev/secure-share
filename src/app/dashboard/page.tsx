"use client";

import { Container, Box, CircularProgress, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { trpc } from "../_trpc/client";
import { CreateSecretDialog } from "@/components/dashboard/CreateSecretDialog";
import { EditSecretDialog } from "@/components/dashboard/EditSecretDialog";

import {
  HeaderSection,
  StatsCards,
  SearchBar,
  SecretsGrid,
  DeleteConfirmationDialog,
} from "../../components/dashboard";
import { getStatus } from "@/lib/utils";
import { Secret, Stats } from "@/types/dashboard";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedSecret, setSelectedSecret] = useState<Secret | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [secretToDelete, setSecretToDelete] = useState<Secret | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const secretsQuery = trpc.secret.mySecrets.useQuery();
  const deleteSecret = trpc.secret.delete.useMutation();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box textAlign="center">
          <CircularProgress size={60} sx={{ color: "white", mb: 2 }} />
          <Typography variant="h6" color="white">
            Loading Dashboard...
          </Typography>
        </Box>
      </Box>
    );
  }

  if (!session) {
    return null;
  }

  const filteredSecrets =
    secretsQuery.data?.filter((secret: Secret) =>
      secret.content?.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  const handleDeleteClick = (secret: Secret) => {
    setSecretToDelete(secret);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (secretToDelete) {
      await deleteSecret.mutateAsync(secretToDelete.id);
      secretsQuery.refetch();
      setDeleteDialogOpen(false);
      setSecretToDelete(null);
    }
  };

  const handleEditClick = (secret: Secret) => {
    setSelectedSecret(secret);
    setEditDialogOpen(true);
  };

  const copySecretUrl = async (secretId: string) => {
    const url = `${window.location.origin}/secret/${secretId}`;
    await navigator.clipboard.writeText(url);
    setCopiedId(secretId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const stats: Stats = {
    total: filteredSecrets.length,
    active: filteredSecrets.filter((s) => getStatus(s) === "active").length,
    expired: filteredSecrets.filter((s) => getStatus(s) === "expired").length,
    viewed: filteredSecrets.filter((s) => getStatus(s) === "viewed").length,
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        pb: 4,
      }}
    >
      <HeaderSection onCreate={() => setCreateDialogOpen(true)} />

      <Container maxWidth="lg">
        <StatsCards stats={stats} />

        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

        <SecretsGrid
          secrets={filteredSecrets}
          isLoading={secretsQuery.isLoading}
          error={secretsQuery.error}
          searchTerm={searchTerm}
          onEdit={handleEditClick}
          onDelete={handleDeleteClick}
          onCopy={copySecretUrl}
          copiedId={copiedId}
          onCreate={() => setCreateDialogOpen(true)}
        />

        {/* Dialogs */}
        <CreateSecretDialog
          open={createDialogOpen}
          onClose={() => setCreateDialogOpen(false)}
          onSuccess={() => {
            setCreateDialogOpen(false);
            console.log("Secret created successfully");
            secretsQuery.refetch();
          }}
        />

        <EditSecretDialog
          open={editDialogOpen}
          onClose={() => setEditDialogOpen(false)}
          secret={selectedSecret!}
          onSuccess={() => {
            setEditDialogOpen(false);
            setSelectedSecret(null);
            secretsQuery.refetch();
          }}
        />

        <DeleteConfirmationDialog
          open={deleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
          onConfirm={handleDeleteConfirm}
          isLoading={deleteSecret.isPending}
        />
      </Container>
    </Box>
  );
}
