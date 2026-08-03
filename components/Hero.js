import React from "react";
import Image from "next/image.js";
import { login } from "@/app/actions/authActions.js";

const Hero = () => {
    return (
        <div className="bg-[#0A1128] min-h-screen flex items-center flex-col lg:flex-row py-40 lg:py-20">
            <div className="w-full lg:w-1/2 p-5 md:p-14 lg:p-28 flex flex-col gap-5 text-center lg:text-left">
                <div>
                    <h1 className="text-5xl md:text-6xl font-bold text-white">
                        A link in bio
                    </h1>
                    <h1 className="text-5xl md:text-6xl font-bold text-white">
                        built for you.
                    </h1>
                </div>
                <p className="text-gray-300 max-w-2xl mx-auto">
                    Join with people using LinkZen for their link in bio. One
                    link to help you share everything you create, curate and
                    sell from your Instagram, TikTok, Twitter, YouTube and other
                    social media profiles.
                </p>
                <form action={login}>
                    <button className="w-[80%] mx-auto md:w-1/2 bg-white text-black rounded-full py-3 px-5 font-semibold cursor-pointer hover:-translate-y-0.5 transition flex items-center justify-center text-center hover:bg-white/70">
                        Get Started for free
                    </button>
                </form>
            </div>
            <div className="w-full lg:w-1/2 p-5 flex justify-center items-center">
                <Image
                    src="/home.png"
                    width={700}
                    height={700}
                    loading="eager"
                    alt="home page image"
                />
            </div>
        </div>
    );
};

export default Hero;
