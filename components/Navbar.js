"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { RxCross2, RxHamburgerMenu } from "react-icons/rx";
import { login, logout } from "@/app/actions/authActions";

const Navbar = ({ session }) => {
    const [showNavbar, setShowNavbar] = useState(true);
    const [openMenu, setOpenMenu] = useState(false);
    useEffect(() => {
        let lastScrollY = typeof window !== "undefined" ? window.scrollY : 0;
        let ticking = false;
        const update = () => {
            if (openMenu) {
                ticking = false;
                return;
            }
            const currentScrollY =
                window.pageYOffset || document.documentElement.scrollTop || 0;
            if (currentScrollY <= 10) {
                setShowNavbar(true);
            } else if (currentScrollY > lastScrollY) {
                setShowNavbar(false);
            } else {
                setShowNavbar(true);
            }
            lastScrollY = currentScrollY;
            ticking = false;
        };
        const controlNavbar = () => {
            if (!ticking) {
                window.requestAnimationFrame(update);
                ticking = true;
            }
        };
        window.addEventListener("scroll", controlNavbar, { passive: true });
        window.addEventListener("touchmove", controlNavbar, { passive: true });
        return () => {
            window.removeEventListener("scroll", controlNavbar);
            window.removeEventListener("touchmove", controlNavbar);
        };
    }, [openMenu]);
    useEffect(() => {
        if (typeof document === "undefined") return;
        if (openMenu) {
            document.documentElement.style.overflow = "hidden";
            document.body.style.overflow = "hidden";
        } else {
            document.documentElement.style.overflow = "";
            document.body.style.overflow = "";
        }
        return () => {
            document.documentElement.style.overflow = "";
            document.body.style.overflow = "";
        };
    }, [openMenu]);

    return (
        <>
            <nav
                className={`w-[90vw] fixed right-[5vw] z-40 bg-[#90b2d0] rounded-full py-2 px-3 md:px-7 flex justify-between items-center text-white transition-all duration-500 ease-in-out ${
                    showNavbar ? "top-10" : "-top-40"
                }`}
            >
                <div className="flex items-center gap-8">
                    <Link href="/" className="flex items-center gap-1">
                        <h1 className="text-3xl font-bold">LinkZen</h1>
                        <Image
                            src="/logo.png"
                            width={35}
                            height={35}
                            alt="Logo"
                            priority
                            className="w-auto h-auto"
                        />
                    </Link>
                    <div className="hidden md:flex items-center">
                        <Link
                            href="/explore"
                            className="hover:bg-white/20 px-3 py-2 rounded-lg transition"
                        >
                            Explore
                        </Link>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <div className="hidden md:block">
                        {session ? (
                            <form action={logout}>
                                <button className="bg-white/50 py-2.5 px-4 rounded-lg text-black hover:-translate-y-0.5 transition">
                                    Log out
                                </button>
                            </form>
                        ) : (
                            <form action={login}>
                                <button className="bg-white/50 py-2.5 px-4 rounded-lg text-black hover:-translate-y-0.5 transition">
                                    Log in
                                </button>
                            </form>
                        )}
                    </div>
                    <button
                        onClick={() => setOpenMenu(!openMenu)}
                        className="md:hidden p-2"
                    >
                        {openMenu ? (
                            <RxCross2 size={28} />
                        ) : (
                            <RxHamburgerMenu size={28} />
                        )}
                    </button>
                </div>
            </nav>
            {openMenu && (
                <div
                    className="fixed inset-0 backdrop-blur-sm z-30 md:hidden"
                    onClick={() => setOpenMenu(false)}
                />
            )}
            <div
                className={`fixed top-32 right-[5vw] w-[90vw] md:hidden bg-[#90b2d0] rounded-3xl overflow-hidden z-50 transition-all duration-300 text-white ${
                    openMenu
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 -translate-y-4 pointer-events-none"
                }`}
            >
                <ul className="flex flex-col text-lg py-2 px-4">
                    <li className="py-3 border-b border-white/20 hover:bg-white/10 rounded px-2">
                        <Link
                            href="/explore"
                            onClick={() => setOpenMenu(false)}
                            className="block w-full"
                        >
                            Explore
                        </Link>
                    </li>
                    <li className="py-3 px-2">
                        {session ? (
                            <form action={logout}>
                                <button
                                    className="w-full text-left hover:text-white/80 transition"
                                    onClick={() => setOpenMenu(false)}
                                >
                                    Log out
                                </button>
                            </form>
                        ) : (
                            <form action={login}>
                                <button
                                    className="w-full text-left hover:text-white/80 transition"
                                    onClick={() => setOpenMenu(false)}
                                >
                                    Log in
                                </button>
                            </form>
                        )}
                    </li>
                </ul>
            </div>
        </>
    );
};

export default Navbar;
