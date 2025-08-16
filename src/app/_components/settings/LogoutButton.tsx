"use client";

import logoutIcon from "@/public/icons/icon-logout.svg";
import { signOut } from "next-auth/react";

import Image from "next/image";

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut()}
      className="flex cursor-pointer items-center gap-2 py-2"
    >
      <Image
        src={logoutIcon}
        alt="color theme icon"
        quality={100}
        priority={true}
      />
      <p className="text-preset-4 cursor-pointer text-neutral-950 capitalize">
        logout
      </p>
    </button>
  );
}
