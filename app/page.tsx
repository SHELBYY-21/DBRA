"use client";

import { useState } from "react";
import EntryGate from "@/components/EntryGate";
import Dashboard from "@/components/Dashboard";

export default function Home() {
  const [entered, setEntered] = useState(false);

  if (!entered) {
    return <EntryGate onEnter={() => setEntered(true)} />;
  }

  return <Dashboard />;
}
