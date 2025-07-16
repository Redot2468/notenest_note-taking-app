import { inter } from "@/app/_styles/font";
import { ChildrenType } from "@/app/_utils/types";
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
      <body className={`${inter.className} antialiased`}>
        {children}
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
