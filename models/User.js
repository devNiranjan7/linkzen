import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        githubId: {
            type: String,
            required: true,
            unique: true,
        },
        handle: {
            type: String,
            required: true,
            unique: true,
        },
        links: [
            {
                text: String,
                url: String,
            },
        ],
    },
    { timestamps: true },
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
