import { toast } from "sonner";

export const handleCopy = async (text: string = "") => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied to clipboard");
    } catch (error) {
      toast.error("Failed to copy");
      console.error("Clipboard copy failed:", error);   
    }
  };

export const maskId = (id: string, tag: string) => {
    const lastFour = id.slice(-4);
    return `${tag}-${lastFour}`;
  };
