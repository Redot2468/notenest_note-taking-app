import logoutIcon from "@/public/icons/icon-logout.svg";
import { SETTINGS } from "@/src/app/_utils/constants";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Settings",
};

export default function Page() {
  return (
    <div className="w-full space-y-4 px-4 py-6">
      <h1 className="text-preset-1 text-neutral-950 capitalize">Settings</h1>

      <div className="flex flex-col gap-2 pb-5">
        {SETTINGS.map((setting, idx) => (
          <Link
            href={setting?.href}
            className="flex items-center gap-2 py-2"
            key={idx}
          >
            <Image
              src={setting?.icon}
              alt="color theme icon"
              quality={100}
              priority={true}
            />
            <p className="text-preset-4 text-neutral-950 capitalize">
              {setting?.content}
            </p>
          </Link>
        ))}

        <div className="h-[1px] bg-neutral-200" />

        <div className="flex items-center gap-2 py-2">
          <Image
            src={logoutIcon}
            alt="color theme icon"
            quality={100}
            priority={true}
          />
          <p className="text-preset-4 text-neutral-950 capitalize">logout</p>
        </div>
      </div>
    </div>
  );
}
