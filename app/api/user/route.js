import { NextResponse } from "next/server.js";
import { connectDB } from "@/lib/mongodb.js";
import User from "@/models/User.js";
import { auth } from "@/auth.js";

export async function POST(request) {
    try {
        const session = await auth();
        if (!session) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Unauthorized",
                },
                { status: 401 },
            );
        }
        await connectDB();
        const body = await request.json();
        const { handle, links } = body;
        const name = session.user.name;
        const email = session.user.email;
        const githubId = session.user.id;
        const existingUser = await User.findOne({ handle });
        if (existingUser) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Handle already exists!",
                },
                { status: 409 },
            );
        }
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return NextResponse.json(
                {
                    success: false,
                    message: "This Github account already has a LinkZen",
                },
                { status: 409 },
            );
        }
        await User.create({
            name,
            email,
            githubId,
            handle,
            links,
        });
        return NextResponse.json(
            {
                success: true,
                message: "User created successfully.",
            },
            { status: 201 },
        );
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message: "Something went wrong",
            },
            { status: 500 },
        );
    }
}

export async function PUT(request) {
    try {
        const session = await auth();

        if (!session) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Unauthorized",
                },
                { status: 401 },
            );
        }
        await connectDB();
        const body = await request.json();
        const { handle, links } = body;
        const currentUser = await User.findOne({
            email: session.user.email,
        });
        if (!currentUser) {
            return NextResponse.json(
                {
                    success: false,
                    message: "User not found.",
                },
                { status: 404 },
            );
        }
        const existingHandle = await User.findOne({ handle });
        if (
            existingHandle &&
            existingHandle._id.toString() !== currentUser._id.toString()
        ) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Handle already exists!",
                },
                { status: 409 },
            );
        }
        currentUser.handle = handle;
        currentUser.links = links;
        await currentUser.save();
        return NextResponse.json(
            {
                success: true,
                message: "Profile updated successfully.",
            },
            { status: 200 },
        );
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message: "Something went wrong.",
            },
            { status: 500 },
        );
    }
}

export async function DELETE() {
    try {
        const session = await auth();
        if (!session) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Unauthorized",
                },
                { status: 401 },
            );
        }
        await connectDB();
        const user = await User.findOne({
            email: session.user.email,
        });
        if (!user) {
            return NextResponse.json(
                {
                    success: false,
                    message: "User not found.",
                },
                { status: 404 },
            );
        }
        await User.deleteOne({
            _id: user._id,
        });
        return NextResponse.json(
            {
                success: true,
                message: "Profile deleted successfully.",
            },
            { status: 200 },
        );
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message: "Something went wrong.",
            },
            { status: 500 },
        );
    }
}
