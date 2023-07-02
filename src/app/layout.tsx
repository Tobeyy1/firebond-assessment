import "./globals.scss";
import { Poppins } from "next/font/google";
import AppWrapper from "./components/AppWrapper/AppWrapper";
import { Providers } from "./providers";

const poppins = Poppins({ weight: ["100", "400", "900"], subsets: ["latin"] });

export const metadata = {
  title: "FireBond Assessment",
  description: "FireBond Frontend Tournament Assessment Test",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <html lang="en">
        <body className={poppins.className}>
          <AppWrapper>{children}</AppWrapper>
        </body>
      </html>
    </Providers>
  );
}
