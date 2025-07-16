import { ChildrenType } from "@/app/_utils/types";
import logo from "@/public/icons/logo.svg";
import Image from "next/image";

export default function Layout({ children }: ChildrenType) {
  return (
    <div className="flex min-h-screen items-center justify-center space-y-2.5 border bg-neutral-100 px-4 py-8">
      {/* auth block */}
      <div className="large-shadow radius-12 mx-auto max-w-[400px] flex-grow space-y-4 bg-white px-4 py-10 md:max-w-[522px] md:px-8 md:py-12 lg:max-w-[540px] lg:px-12">
        {/* app logo in header */}
        <header className="flex items-center justify-center">
          <div>
            <Image src={logo} alt="logo" quality={100} priority={true} />
          </div>
        </header>

        {/* Rest of the auth content */}
        <main>{children}</main>
      </div>
    </div>
  );
}
