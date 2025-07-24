"use client";

import { Archive, Home, Search, Settings, Tag } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const footerLinks = [
  { icon: Home, link: "/notes" },
  { icon: Search, link: "/search" },
  { icon: Archive, link: "/archived" },
  { icon: Tag, link: "/tags" },
  { icon: Settings, link: "/settings" },
];

export default function MobileFooter() {
  const pathname = usePathname();
  return (
    <footer className="border-2 border-green-700 bg-white px-4 py-3 lg:hidden">
      <div className="flex items-center justify-between">
        {footerLinks?.map((footerLink, id) => (
          <Link
            href={footerLink?.link}
            key={id}
            className={`radius-4 py-1.5 ${pathname === footerLink?.link && "bg-blue-50"} flex w-full items-center justify-center`}
          >
            <footerLink.icon
              className={`size-5 ${pathname === footerLink?.link ? "text-blue-500" : "text-neutral-600"}`}
            />
          </Link>
        ))}
      </div>
    </footer>
  );
}
