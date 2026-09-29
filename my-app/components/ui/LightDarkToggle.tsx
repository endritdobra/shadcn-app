"use client"

import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {Button} from "@/components/ui/button";
import {MoonIcon, SunIcon} from "lucide-react";
import {useTheme} from "next-themes";

export function LightDarkToggle({className} : { className?: string}){
    const {setTheme, resolvedTheme} = useTheme();
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger className={className} render={<Button variant="ghost" size="icon" aria-label="Toggle color theme" />} onClick={() =>
                    setTheme(resolvedTheme === 'light' ? 'dark' : 'light' )
                }>
                    <SunIcon className="block dark:hidden" />
                    <MoonIcon className="hidden dark:block" />
                </TooltipTrigger>
                <TooltipContent>
                    <span className="hidden dark:inline">Enable light mode</span>
                    <span className="inline dark:hidden">Enable dark mode</span>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}
