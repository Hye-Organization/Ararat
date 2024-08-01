import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className + "  dark:bg-slate-925 dark:text-white"}>
        {children}
      </body>
    </html>
  );
}
