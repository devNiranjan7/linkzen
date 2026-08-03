import { Inter } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import NavbarWrapper from "@/components/NavbarWrapper.js";
import AuthSessionProvider from "@/components/SessionProvider.js";

const inter = Inter({
    subsets: ["latin"],
    display: "swap",
});

export const metadata = {
    title: "LinkZen - Your Links, Perfectly Organized",
    description:
        "LinkZen is a modern Linktree-inspired platform that lets users create a personalized landing page to showcase all their important links in one place.",
    icons: {
        icon: "/logo.png",
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" className={`${inter.className}`}>
            <body className="min-h-screen flex flex-col">
                <AuthSessionProvider>
                    <NavbarWrapper />
                    <main className="flex-1">{children}</main>
                    <ToastContainer
                        position="bottom-right"
                        autoClose={2000}
                        hideProgressBar={false}
                        newestOnTop
                        closeOnClick
                        pauseOnHover
                        theme="dark"
                    />
                </AuthSessionProvider>
            </body>
        </html>
    );
}
