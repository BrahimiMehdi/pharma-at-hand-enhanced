"use client";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Download } from "lucide-react";
import { usePathname } from "next/navigation";

const PwaButton = () => {
  const [supportsPWA, setSupportsPWA] = useState(false);
  const [promptInstall, setPromptInstall] = useState<any>(null);
  const path = usePathname()
  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setSupportsPWA(true);
      setPromptInstall(e);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => {
      window.removeEventListener("transitionend", handler);
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const onClick = (evt: any) => {
    evt.preventDefault();
    if (promptInstall) {
      promptInstall.prompt();
    }
  };
  if (!supportsPWA) {
    return null;
  }
  return (
    <Button
      aria-label="Install app"
      size={"full"}
      position={"start"}
      className="overflow-hidden my-8 lg:max-w-xs"
      onClick={onClick}
    >
      <Download strokeWidth={1.2} size={"18px"} className="mr-2" />
      <span>Install App</span>
    </Button>
  );
};

export default PwaButton;
