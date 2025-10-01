"use client";

import { useState, useEffect } from 'react';

export function Footer() {
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="container mx-auto py-8 text-center text-muted-foreground">
      <p>&copy; {year} SupremeHealth. All rights reserved.</p>
    </footer>
  );
}
