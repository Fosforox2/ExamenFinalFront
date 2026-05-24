import type { Metadata } from "next";
import "./globals.css";
import "./layout.css";
import NavigatorPages from "./components/NavigatorPages";
import { FavsProvider } from "@/context/listaContext";

export const metadata: Metadata = {
  title: "Repasote final increíble",
  description: "Que facil que va a estar ese examen",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="MainContainer">
          <div className="TitleContainer">
            <h1>Busqueda Examen Final</h1>
            <NavigatorPages />
          </div>

          <FavsProvider>
            {children}
          </FavsProvider>

        </div>
      </body>
    </html>
  );
}