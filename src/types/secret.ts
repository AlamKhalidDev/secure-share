export interface ViewSecretProps {
  id: string;
  isPasswordRequired: boolean;
}

export interface SecretData {
  content: string;
  isOneTime: boolean;
  expiresAt: Date;
}

export interface SecretAccessFormProps {
  isPasswordRequired: boolean;
  password: string;
  setPassword: (password: string) => void;
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
  error: string;
  handleGetSecret: () => Promise<void>;
  isLoading: boolean;
  handleKeyPress: (e: React.KeyboardEvent) => void;
}
