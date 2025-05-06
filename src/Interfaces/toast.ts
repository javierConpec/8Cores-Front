export interface ToastProps {
  type: "success" | "error" | "info" | "warning";
  message: string;
  onClose: () => void;
}
