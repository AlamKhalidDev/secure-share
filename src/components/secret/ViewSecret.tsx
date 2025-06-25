"use client";

import { useState } from "react";
import { trpc } from "@/app/_trpc/client";
import SecretRetrieved from "./SecretRetrieved";
import SecretAccessForm from "./SecretAccessForm";
import { ViewSecretProps } from "@/types/secret";

export default function ViewSecret({
  id,
  isPasswordRequired,
}: ViewSecretProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const getSecret = trpc.secret.get.useQuery(
    { id, password: password || undefined },
    {
      enabled: false,
      retry: false,
    }
  );

  const markAsViewed = trpc.secret.markAsViewed.useMutation();

  const handleGetSecret = async () => {
    setError("");
    try {
      const data = await getSecret.refetch();
      if (data.status === "success") {
        if (data.data.isOneTime && !data.data.isViewed) {
          markAsViewed.mutate(id);
        }
      } else if (data.status === "error") {
        setError(data.error.message);
      }
    } catch {
      setError("Failed to fetch secret. Please try again.");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !getSecret.isFetching) {
      handleGetSecret();
    }
  };

  if (getSecret.data) {
    return (
      <SecretRetrieved
        secretData={{
          ...getSecret.data,
          expiresAt: new Date(getSecret.data.expiresAt),
        }}
      />
    );
  }

  return (
    <SecretAccessForm
      isPasswordRequired={isPasswordRequired}
      password={password}
      setPassword={setPassword}
      showPassword={showPassword}
      setShowPassword={setShowPassword}
      error={error}
      handleGetSecret={handleGetSecret}
      isLoading={getSecret.isFetching}
      handleKeyPress={handleKeyPress}
    />
  );
}
