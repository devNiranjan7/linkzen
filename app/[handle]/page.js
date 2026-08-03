import { connectDB } from "@/lib/mongodb.js";
import { notFound } from "next/navigation.js";
import User from "@/models/User.js";
import Image from "next/image.js";
import { auth } from "@/auth.js";
import Link from "next/link.js";

export default async function Handle({ params }) {
    const session = await auth();
    await connectDB();
    const { handle } = await params;
    const user = await User.findOne({ handle }).lean();
    if (!user) {
        notFound();
    }
    const isOwner = session?.user?.email === user.email;
    return (
        <div className="min-h-screen bg-[#0a1128] flex flex-col px-5">
            <div className="flex-1 flex flex-col items-center justify-center">
                <div className="w-full max-w-md flex flex-col items-center gap-6">
                    <Image
                        src={"/avatar.webp"}
                        height={120}
                        width={120}
                        loading="eager"
                        alt={user.name}
                        className="rounded-full object-cover border-4 border-white w-25 h-25 md:w-35 md:h-35"
                    />
                    <div className="text-center">
                        <p className="text-[#90b2d0] wrap-anywhere">
                            @{user.handle}
                        </p>
                    </div>
                    <div className="w-full flex flex-col gap-4">
                        {user.links.map((link) => (
                            <a
                                key={link._id}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-white text-black py-3 rounded-full text-center font-semibold hover:scale-105 transition select-none"
                            >
                                {link.text}
                            </a>
                        ))}
                    </div>
                    {isOwner && (
                        <Link
                            href="/edit"
                            className="fixed bottom-15 md:bottom-6 right-6 bg-white text-black px-5 py-3 rounded-full shadow-lg hover:scale-105 transition flex gap-4"
                        >
                            ✏️
                            <span className="hidden md:flex">Edit Profile</span>
                        </Link>
                    )}
                </div>
            </div>
            <p className="text-white/50 py-5 text-center">
                Powered by <span className="font-semibold">LinkZen</span>
            </p>
        </div>
    );
}

export async function generateMetadata({ params }) {
    const { handle } = await params;

    return {
        title: `${handle} | LinkZen`,
        description: `Visit ${handle}'s LinkZen profile.`,
    };
}
