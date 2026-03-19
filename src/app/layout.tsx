import type { Metadata } from "next";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Felipe Gabriel | Web Developer",
  description: "Portfólio profissional com foco em web, DevOps e automações."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning className="dark">
      <body className="dark">{children}</body>
    </html>
  );
}

