import "./globals.css";
import StoreProvider from "../components/StoreProvider";
import ScrollToTop from "../components/ScrollToTop";

export const metadata = {
  title: "Transport UI",
  description: "Transport management system",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body>
        <StoreProvider>
          {children}
          <ScrollToTop />
        </StoreProvider>
      </body>
    </html>
  );
}
