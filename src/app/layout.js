import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Head from "./components/Head";
import Footer from "./components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "hiસાબી ચોપડો",
  description: "ટીપે ટીપે સરોવર ભરાય",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head></Head>

      <body className={inter.className}>
        <Header></Header>
        {children}
        <Footer></Footer>
      </body>
    </html>
  );
}
