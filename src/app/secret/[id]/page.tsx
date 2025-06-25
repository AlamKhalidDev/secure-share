import { notFound } from "next/navigation";
import { Container, Typography, Box } from "@mui/material";
import { LockClock, VisibilityOff } from "@mui/icons-material";
import { formatDistanceToNow } from "date-fns";
import ViewSecret from "@/components/secret/ViewSecret";
import prisma from "@/server/db";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function SecretPage({ params }: PageProps) {
  const secret = await prisma.secret.findUnique({
    where: { id: (await params).id },
    select: {
      id: true,
      isOneTime: true,
      isViewed: true,
      expiresAt: true,
      password: true,
      createdAt: true,
    },
  });

  if (!secret) {
    return notFound();
  }

  const currentDate = new Date();
  const isExpired = secret.expiresAt && secret.expiresAt < currentDate;
  const isAlreadyViewed = secret.isOneTime && secret.isViewed;

  if (isExpired || isAlreadyViewed) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          display: "flex",
          alignItems: "start",
          justifyContent: "center",
          py: 4,
          px: 2,
        }}
      >
        <Container maxWidth="sm">
          <Box
            sx={{
              textAlign: "center",
              background: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              borderRadius: 4,
              boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
              p: 6,
            }}
          >
            <Box
              sx={{
                width: 100,
                height: 100,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mx: "auto",
                mb: 4,
                boxShadow: "0 15px 35px rgba(255, 107, 107, 0.3)",
              }}
            >
              {isExpired ? (
                <LockClock sx={{ fontSize: 50, color: "white" }} />
              ) : (
                <VisibilityOff sx={{ fontSize: 50, color: "white" }} />
              )}
            </Box>

            <Typography
              variant="h4"
              fontWeight="bold"
              gutterBottom
              sx={{
                background: "linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                mb: 2,
              }}
            >
              {isExpired ? "Secret Expired" : "Already Viewed"}
            </Typography>

            <Typography
              variant="body1"
              color="text.secondary"
              paragraph
              sx={{
                fontSize: "1.1rem",
                lineHeight: 1.6,
                maxWidth: 400,
                mx: "auto",
                mb: 3,
              }}
            >
              {isExpired
                ? "This secret has expired and is no longer accessible. Secrets have a limited lifespan for security purposes."
                : "This one-time secret can only be viewed once and has already been accessed. This ensures maximum security for sensitive information."}
            </Typography>

            {secret.createdAt && (
              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  backgroundColor: "#f8fafc",
                  border: "1px solid #e2e8f0",
                  borderRadius: 3,
                  px: 3,
                  py: 1.5,
                  mt: 2,
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  Created{" "}
                  <strong>
                    {formatDistanceToNow(new Date(secret.createdAt), {
                      addSuffix: true,
                    })}
                  </strong>
                </Typography>
              </Box>
            )}
          </Box>
        </Container>
      </Box>
    );
  }

  const isPasswordRequired = !!secret.password;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        py: 4,
        px: 2,
      }}
    >
      <Container maxWidth="sm">
        <ViewSecret id={(await params).id} isPasswordRequired={isPasswordRequired} />
      </Container>
    </Box>
  );
}
