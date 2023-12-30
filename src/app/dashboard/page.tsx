"use client";

import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";

export default function Dashboard() {
  const { setTheme } = useTheme();

  return (
    <main style={{ padding: "var(--padding-side)", display: "flex", flexDirection: "column", alignItems: "center" }}>
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
