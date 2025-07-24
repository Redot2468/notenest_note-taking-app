import logo from "@/public/icons/logo.svg";
import Image from "next/image";

export default function NavBar() {
  return (
    <nav className="bg-neutral-100 px-4 py-3">
      <div>
        <Image src={logo} alt="logo" quality={100} priority={true} />
      </div>
    </nav>
  );
}
