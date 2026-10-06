"use client"

import MainMenu from "@/app/dashboard/components/main-menu";
import MainTitle from "@/app/dashboard/components/main-title";
import {Drawer, DrawerContent, DrawerTrigger} from "@/components/ui/drawer";
import {MenuIcon} from "lucide-react";
import {useMediaQuery} from "@/hooks/use-media-query";
import {useState} from "react";

export default function DashboardLayout({children}: { children: React.ReactNode }) {
    const isDesktop = useMediaQuery("(min-width:768px)");

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return <div className={'md:grid md:grid-cols-[250px_1fr] h-screen'}>
        <MainMenu className='hidden md:flex'/>
        {!isDesktop && (
            <div className='p-4 flex justify-between md:hidden sticky top-0 left-0 bg-background'>
                <MainTitle />
                <Drawer swipeDirection={'right'} open={mobileMenuOpen} onOpenChange={(open) => setMobileMenuOpen(open)}>
                    <DrawerTrigger>
                        <MenuIcon />
                    </DrawerTrigger>
                    <DrawerContent>
                        <MainMenu />
                    </DrawerContent>
                </Drawer>
            </div>
        )}

        <div className={'overflow-auto py-2 px-4'}>
            <h1 className={'pb-4'}>Welcome back, Endos</h1>
            {children}
        </div>
    </div>
}