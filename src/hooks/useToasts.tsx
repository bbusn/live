import { useContext } from "react";
import { ToastContext } from "../providers/ToastsProvider";

export const useToasts = () => useContext(ToastContext);