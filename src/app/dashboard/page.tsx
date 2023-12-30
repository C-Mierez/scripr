"use client";

import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { useState } from "react";

export default function Dashboard() {
  const { setTheme } = useTheme();

  return (
    <main>
      Dashboard Page
      <div>
        <Button
          onClick={() => {
            setTheme("light");
          }}
        >
          Light
        </Button>
        <Button
          onClick={() => {
            setTheme("dark");
          }}
        >
          Dark
        </Button>
      </div>
    </main>
  );
}
