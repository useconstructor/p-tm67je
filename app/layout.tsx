import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Agenda Taller | Planificación de trabajos",
  description: "Organiza tus clientes, horarios y estados en una agenda de trabajo.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
