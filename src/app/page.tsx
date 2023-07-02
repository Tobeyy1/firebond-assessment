"use client";

import classes from "./page.module.scss";
import Welcome from "./components/OnBoarding/Welcome";
import Setup from "./components/Setup/Setup";
import { useState } from "react";

export default function Home() {
  const [showWelcome, setShowWelcome] = useState<boolean>(true);
  return (
    <main className={classes.container}>
      {showWelcome ? <Welcome setShowWelcome={setShowWelcome} /> : <Setup />}
    </main>
  );
}
