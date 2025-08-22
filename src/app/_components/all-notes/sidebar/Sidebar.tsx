"use client";

import logo from "@/public/icons/logo.svg";
import { ArchiveIcon, ChevronRight, HomeIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const SIDEBAR_MENU = [
  {
    icon: HomeIcon,
    name: "all notes",
    link: "/notes",
  },
  {
    icon: ArchiveIcon,
    name: "archived notes",
    link: "/archived",
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  const isLinkActive = (currentRoute: string) =>
    pathname.startsWith(currentRoute);

  return (
    <div className="space-y-4 border-r border-neutral-200">
      <div className="py-3">
        <Image src={logo} alt="logo" quality={100} priority={true} />
      </div>

      <div className="space-y-2 border-b border-neutral-200 pb-2">
        {SIDEBAR_MENU?.map((menu, idx) => (
          <Link
            href={menu.link}
            key={idx}
            className={`flex items-center justify-between px-3 py-2.5 ${isLinkActive(menu?.link) && "radius-8 bg-neutral-100 text-blue-500"}`}
          >
            <div className="flex items-center gap-2">
              <menu.icon className="size-4" />

              <p className="text-preset-4 text-neutral-950 capitalize">
                {menu.name}
              </p>
            </div>

            <ChevronRight className="size-4 text-neutral-950" />
          </Link>
        ))}
      </div>
    </div>
  );
}
