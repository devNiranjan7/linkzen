import Link from "next/link";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export default async function ExplorePage() {
    await connectDB();
    const users = await User.find({}, "name handle").lean();
    return (
        <div className="min-h-screen bg-[#0A1128] text-white pt-32 px-6">
            <h1 className="text-5xl font-bold text-center mb-12">
                Explore LinkZen
            </h1>
            {users.length === 0 ? (
                <p className="text-center text-xl text-gray-300">
                    No LinkZen profiles found.
                </p>
            ) : (
                <div className="max-w-3xl mx-auto flex flex-col gap-4 text-black">
                    {users.map((user) => (
                        <Link
                            key={user._id.toString()}
                            href={`/${user.handle}`}
                            className="bg-white/90 hover:bg-white rounded-full py-2 px-5 md:py-5 md:px-10 transition-all duration-300 flex justify-between items-center hover:translate-x-1"
                        >
                            <div>
                                <h2 className="text-xl font-semibold">
                                    {user.name}
                                </h2>

                                <p className="text-gray-400">@{user.handle}</p>
                            </div>
                            <span className="text-2xl">→</span>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
