import { auth } from "@/auth.js";
import { connectDB } from "@/lib/mongodb.js";
import User from "@/models/User.js";
import { redirect } from "next/navigation.js";
import LinkForm from "@/components/LinkForm.js";

export default async function EditPage() {
    const session=await auth();
    if(!session){
        redirect("/");
    }
    await connectDB();
    const user=await User.findOne({email:session.user.email}).lean();
    if(!user){
        redirect("/add");
    }
    return (
        <LinkForm
        mode="edit"
        initialData={JSON.parse(JSON.stringify(user))}
    />
    )
}