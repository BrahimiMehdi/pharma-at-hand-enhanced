"use client"
import { useEffect, useRef } from "react";
import { toast } from "sonner";

export default function DownloadWAP() {
  const promptEventRef = useRef<any>(null);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      promptEventRef.current = e;
      
      // Show toast notification for app installation
      toast("Install our app for a better experience 🚀", {
        description: "Get faster access and offline capabilities",
        action: {
          label: "Install",
          onClick: async () => {
            if (!promptEventRef.current) return;
            
            try {
              promptEventRef.current.prompt();
              const { outcome } = await promptEventRef.current.userChoice;
              
              if (outcome === "accepted") {
                toast.success("App installation started!");
              } else {
                toast.info("Installation cancelled");
              }
              
              promptEventRef.current = null;
            } catch (error) {
              console.error("Installation error:", error);
              toast.error("Failed to install the app");
            }
          },
        },
        duration: 10000, // 10 seconds
        position: "bottom-right",
      });
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  return null; // No UI needed since we're using toast
}
