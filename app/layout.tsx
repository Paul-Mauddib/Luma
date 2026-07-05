import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Luma — Spanish residency, without the maze",
  description:
    "Prepare a complete, validated Spanish residency application yourself. AI-guided checklists, document validation, sworn translations and filing guidance — supervised by colegiado professionals.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
