import { ChildrenType } from "@/app/_utils/types";
import BodyProvider from "@/src/app/_components/BodyProvider";
import Providers from "@/src/app/_lib/react-query/providers";
import StoreProvider from "@/src/app/_lib/redux/StoreProvider";
import "@styles/globals.css";
import { Metadata } from "next";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: {
    template: "%s - NoteNest",
    default: "Home - NoteNest",
  },
  description:
    "Your all in one notes, where you can note down thoughts, conclusions from research and readings.",
};

export default function RootLayout({ children }: ChildrenType) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Providers>
          <StoreProvider>
            <BodyProvider>{children}</BodyProvider>
          </StoreProvider>
        </Providers>
        <Toaster
          toastOptions={{
            duration: 10000,
            className: "font-medium text-[15px] py-0",
            style: {
              paddingTop: "5px",
              paddingBottom: "5px",
            },
            error: {
              iconTheme: {
                primary: "#fb3748",
                secondary: "#ffffff",
              },
            },
            success: {
              iconTheme: {
                primary: "#21c16b",
                secondary: "#ffffff",
              },
            },
          }}
        />
      </body>
    </html>
  );
}
