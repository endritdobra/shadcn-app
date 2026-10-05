import {PersonStandingIcon} from "lucide-react";

export default function MainTitle() {
    return <h4 className={'flex items-center gap-1 text-foreground'}>
        <PersonStandingIcon size={40} className={'shrink-0 text-[#e63370]'} /> SupportMe
    </h4>
}
