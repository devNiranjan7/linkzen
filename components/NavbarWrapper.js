import { auth } from "@/auth.js";
import Navbar from "./Navbar.js";

export default async function NavbarWrapper() {
    const session=await auth();
    return <Navbar session={session}/>
}