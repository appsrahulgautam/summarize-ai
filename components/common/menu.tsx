"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu as MenuIcon, X } from "lucide-react";
import AuthButton from "./authbutton";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const Menu = () => {
  const pathname = usePathname();

  const [open, setOpen] = useState(false);
  const href_pricing = "/pricing";
  const href_account = "/account";
  const href_upload = "/upload";
  const href_dashboard = "/dashboard";



  return (
    <nav className="relative">
      {/* Desktop Menu */}
      <div className="hidden md:flex gap-4 items-center">
        <Link
          href={href_upload}
          className={cn(
            "hover:text-rose-500",
            pathname == href_upload && "text-rose-700"
          )}
        >
          Upload PDF
        </Link>
        <Link
          href={href_dashboard}
          className={cn(
            "hover:text-rose-500",
            pathname == href_dashboard && "text-rose-700"
          )}
        >
          Dashboard
        </Link>

        <Link
          href={href_account}
          className={cn(
            "hover:text-rose-500",
            pathname == href_account && "text-rose-700"
          )}
        >
          Account
        </Link>
        <Link
          href={href_pricing}
          className={cn(
            "hover:text-rose-500",
            pathname == href_pricing && "text-rose-700"
          )}
        >
          Pricing
        </Link>
        <AuthButton />
      </div>

      {/* Mobile Hamburger */}
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden p-2 bg-transparent"
        aria-label="Toggle menu"
      >
        {open ? <X size={24} /> : <MenuIcon size={24} />}
      </button>

      {/* Mobile Dropdown */}
      {open && (
        <div
          className="flex flex-col justify-center items-center absolute right-0 mt-2 w-60 p-4  rounded-lg border
        shadow-lg md:hidden bg-rose-100"
        >
          <Link
            href={href_upload}
            className={cn(
              "hover:text-rose-500",
              pathname == href_upload && "text-rose-700"
            )}
          >
            Upload PDF
          </Link>
          <Link
            href={href_dashboard}
            className={cn(
              "hover:text-rose-500",
              pathname == href_dashboard && "text-rose-700"
            )}
          >
            Dashboard
          </Link>

          <Link href={href_account} className="hover:text-rose-500">
            Account
          </Link>
          <Link
            href={href_pricing}
            className="block px-4 py-4 hover:bg-muted"
            onClick={() => setOpen(false)}
          >
            Pricing
          </Link>
          <AuthButton />
        </div>
      )}
    </nav>
  );
};

export default Menu;
