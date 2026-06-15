"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ToolGrid } from "@/components/ToolGrid";
import { DonationBanner } from "@/components/DonationBanner";
import { DonationModal } from "@/components/DonationModal";
import { Footer } from "@/components/Footer";

export default function Home() {
  const [donateOpen, setDonateOpen] = useState(false);

  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <DonationBanner onDonateClick={() => setDonateOpen(true)} />
        <ToolGrid />
      </main>
      <Footer />
      <DonationModal open={donateOpen} onOpenChange={setDonateOpen} />
    </>
  );
}
