import {Button} from "@/components/ui/button";
import {PersonStandingIcon} from "lucide-react";
import Link from "next/link";

export default function LandingPage () {
    return (
        <>
            <h1 className="flex gap-2"><PersonStandingIcon size={50} className='text-pink-500'/> Support me</h1>
            <p>
                the best dashboard to manage customer support
            </p>
            <div className="flex gap-2 items-center">
                <Button render={<Link href='/login' />} nativeButton={false}>
                    Login
                </Button>
                <small>or</small>
                <Button render={<Link href='/sign-up' />} nativeButton={false} variant='outline'>
                    Sign up
                </Button>
            </div>
        </>
    )
}
