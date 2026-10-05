"use client"

import {usePathname} from "next/navigation";
import Link from "next/link";
import {cn} from "@/lib/utils";

type Props = {
    children: React.ReactNode,
    href: string
}

export default function MenuItem({children, href}: Props  ) {
    const pathname = usePathname();
    const isActive = pathname === href;

    return <Link href={href} aria-current={isActive ? "page" : undefined} className={cn("flex h-10 items-center rounded-md px-2 text-base font-medium text-zinc-600 dark:text-[#a1a1aa] transition-colors hover:bg-zinc-200 hover:text-black dark:hover:bg-[#34343a] dark:hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e63370]", isActive && "bg-[#e63370] text-black dark:text-white hover:bg-[#e63370] dark:hover:bg-[#e63370]")}>
        {children}
    </Link>
}
