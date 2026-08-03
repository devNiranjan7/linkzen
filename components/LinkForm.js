"use client";

import Image from "next/image.js";
import { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { toast } from "react-toastify";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation.js";

export default function LinkForm({ mode, initialData }) {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [form, setForm] = useState({
        handle: initialData?.handle || "",
        links: initialData?.links || [
            {
                text: "",
                url: "",
            },
        ],
    });
    const [loading, setLoading] = useState(false);
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };
    const handleLinkChange = (index, field, value) => {
        const updatedLinks = [...form.links];
        updatedLinks[index][field] = value;
        setForm({
            ...form,
            links: updatedLinks,
        });
    };
    const addLink = () => {
        const lastLink = form.links[form.links.length - 1];

        if (!lastLink.text.trim() || !lastLink.url.trim()) {
            toast.error("Fill the current link first");
            return;
        }
        setForm({
            ...form,
            links: [
                ...form.links,
                {
                    text: "",
                    url: "",
                },
            ],
        });
        toast.success("New Link Added Successfully");
    };
    const deleteLink = (index) => {
        if (form.links.length === 1) {
            return;
        }
        const updatedLinks = form.links.filter((_, i) => i !== index);
        setForm({
            ...form,
            links: updatedLinks,
        });
        toast.success("Link Deleted Successfully");
    };
    const handleSubmit = async () => {
        if (status === "loading") {
            return;
        }
        if (!session) {
            toast.error("Please login first");
            return;
        }
        setLoading(true);
        if (!form.handle.trim()) {
            toast.error("Please enter a handle");
            setLoading(false);
            return;
        }
        for (const link of form.links) {
            if (!link.text.trim() || !link.url.trim()) {
                toast.error("Please complete all links");
                setLoading(false);
                return;
            }
            try {
                new URL(link.url);
            } catch {
                toast.error("Please enter a valid URL");
                setLoading(false);
                return;
            }
        }
        try {
            const response = await fetch("/api/user", {
                method: mode === "create" ? "POST" : "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: session.user.name,
                    email: session.user.email,
                    githubId: session.user.id,
                    handle: form.handle,
                    links: form.links,
                }),
            });
            const data = await response.json();
            if (data.success) {
                toast.success(
                    mode === "create" ? "Profile created!" : "Profile updated!",
                );
                setTimeout(() => {
                    router.push(`/${form.handle}`);
                }, 1000);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Something went wrong");
        }
        setLoading(false);
    };
    const handleDelete = async () => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete your LinkZen? This action cannot be undone.",
        );
        if (!confirmDelete) return;
        try {
            const response = await fetch("/api/user", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: session.user.email,
                }),
            });
            const data = await response.json();
            if (data.success) {
                toast.success("Profile deleted successfully.");
                setTimeout(async () => {
                    await signOut({
                        callbackUrl: "/",
                    });
                }, 1000);
            } else {
                toast.error(data.message);
            }
        } catch {
            toast.error("Something went wrong.");
        }
    };

    return (
        <div className="bg-[#0A1128] min-h-screen flex items-center flex-col lg:flex-row pt-40 lg:pt-20">
            <div className="w-full lg:w-2/3 p-5 md:p-14 lg:p-28 flex flex-col gap-6 text-center lg:text-left">
                <h1 className="text-5xl md:text-6xl font-bold text-white">
                    {mode === "create"
                        ? "Create your LinkZen"
                        : "Edit your LinkZen"}
                </h1>
                <div className="flex flex-col gap-3">
                    <h3 className="text-2xl md:text-3xl font-semibold text-white italic">
                        {mode === "create"
                            ? "Step 1: Create your Handle"
                            : "Step 1: Update your Handle"}
                    </h3>
                    <input
                        type="text"
                        name="handle"
                        value={form.handle}
                        onChange={handleChange}
                        placeholder="Choose a handle"
                        className="text-white focus:outline-none bg-[#90b2d0] py-1 px-5 rounded-lg focus:ring-2 focus:ring-white/50 w-[80%] mx-auto lg:mx-0 md:w-1/2"
                    />
                </div>
                <div className="flex flex-col gap-8">
                    <h3 className="text-2xl md:text-3xl font-semibold text-white italic">
                        {mode === "create"
                            ? "Step 2: Add Links"
                            : "Step 2: Update Your Links"}
                    </h3>
                    {form.links.map((link, index) => (
                        <div key={index} className="flex flex-col gap-3">
                            <input
                                type="text"
                                name="text"
                                value={link.text}
                                onChange={(e) =>
                                    handleLinkChange(
                                        index,
                                        "text",
                                        e.target.value,
                                    )
                                }
                                placeholder="Enter link text"
                                className="text-white focus:outline-none bg-[#90b2d0] py-1 px-5 rounded-lg focus:ring-2 focus:ring-white/50 w-[80%] mx-auto lg:mx-0 md:w-1/2"
                            />
                            <input
                                type="text"
                                name="url"
                                placeholder="Enter link"
                                value={link.url}
                                onChange={(e) =>
                                    handleLinkChange(
                                        index,
                                        "url",
                                        e.target.value,
                                    )
                                }
                                className="text-white focus:outline-none bg-[#90b2d0] py-1 px-5 rounded-lg focus:ring-2 focus:ring-white/50 w-[80%] mx-auto lg:mx-0 md:w-1/2"
                            />
                            <button
                                type="button"
                                hidden={form.links.length === 1}
                                onClick={() => deleteLink(index)}
                                className="text-red-400 hover:text-red-500 transition w-fit mx-auto lg:mx-2"
                            >
                                <RiDeleteBin6Line size={22} />
                            </button>
                        </div>
                    ))}

                    <button
                        onClick={addLink}
                        type="button"
                        className="w-[80%] mx-auto lg:mx-0 md:w-1/2 bg-white text-black rounded-full py-3 px-5 font-semibold cursor-pointer hover:translate-x-1 transition flex items-center justify-center text-center"
                    >
                        {mode === "create" ? "Add Link" : "Add Another Link"}
                    </button>
                </div>
                <div>
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="w-[80%] mx-auto lg:mx-0 md:w-1/2 bg-white text-black rounded-full py-3 px-5 font-semibold cursor-pointer hover:translate-x-1 transition"
                    >
                        {loading
                            ? mode === "create"
                                ? "Creating..."
                                : "Updating..."
                            : mode === "create"
                              ? "Finalize"
                              : "Update Profile"}
                    </button>
                </div>
                {mode === "edit" && (
                    <button
                        onClick={handleDelete}
                        className="w-[80%] mx-auto lg:mx-0 md:w-1/2 bg-red-600 hover:bg-red-700 text-white rounded-full py-3 px-5 font-semibold cursor-pointer hover:translate-x-1 transition"
                    >
                        Delete Profile
                    </button>
                )}
            </div>
            <div className="w-full lg:w-1/3 p-5 flex justify-center items-center">
                <Image
                    src="/generate-page.png"
                    width={700}
                    height={700}
                    loading="eager"
                    alt="home page image"
                />
            </div>
        </div>
    );
}
