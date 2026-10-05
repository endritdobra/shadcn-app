import MainTitle from "@/app/dashboard/components/main-title";
import MenuItem from "@/app/dashboard/components/menu-item";
import {Avatar, AvatarFallback} from "@/components/ui/avatar";
import Link from "next/link";
import {LightDarkToggle} from "@/components/ui/LightDarkToggle";

export default function MainMenu() {
    return <div className={'flex min-h-0 flex-col bg-[#f2f2f2] text-foreground dark:bg-[#212123] overflow-auto p-4'}>
        <div className={'shrink-0 border-b border-zinc-300 dark:border-black pb-4'}>
            <MainTitle />
        </div>
        <nav aria-label="Main menu" className={'grow pt-4'}>
            <MenuItem href={'/dashboard'}>My dashboard</MenuItem>
            <MenuItem href={'/dashboard/teams'}>Teams</MenuItem>
            <MenuItem href={'/dashboard/employees'}>Employees</MenuItem>
            <MenuItem href={'/dashboard/account'}>Account</MenuItem>
            <MenuItem href={'/dashboard/settings'}>Settings</MenuItem>
        </nav>
        <div className={'flex shrink-0 gap-2 items-center pt-4'}>
            <Avatar className="size-10">
                <AvatarFallback className={'bg-pink-300 text-base text-black dark:bg-[#9d1745] dark:text-white'}>
                    TP
                </AvatarFallback>
            </Avatar>
            <Link href={'/'} className={'underline'}>
                Logout
            </Link>
            <LightDarkToggle className={'ml-auto'} />
        </div>
    </div>
}
