import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {ListChecks, PieChartIcon, StarIcon, UsersIcon} from "lucide-react";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import WorkLocationTrends from "@/app/dashboard/employees/work-location-trends";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import TeamDistributionChart from "@/app/dashboard/teams/team-distribution-chart";
import SupportTicketsResolved from "@/app/dashboard/teams/support-tickets-resolved";

export default function TeamStats() {
    const teamLeaders = [
        {
            firstName: "Colin",
            lastName: "Murray",
            avatar: '/cm.jpg',
        },
        {
            firstName: "Tom",
            lastName: "Phillips",
        },
        {
            firstName: "Liam",
            lastName: "Fuentes",
        },
        {
            firstName: "Tina",
            lastName: "Fey",
            avatar: '/tf.jpg',
        },
        {
            firstName: "Katie",
            lastName: "Johnson",
        },
        {
            firstName: "Tina",
            lastName: "Jones",
        },
        {
            firstName: "Amy",
            lastName: "Adams",
        },
        {
            firstName: "Ryan",
            lastName: "Lopez",
            avatar: '/rl.jpg',
        },
        {
            firstName: "Jenny",
            lastName: "Jones",
        },
    ];

    return (
        <>
            <div className='grid lg:grid-cols-3 gap-4'>
                <Card>
                    <CardHeader className={'pb-2'}>
                        <CardTitle className='text-base'>Total teams</CardTitle>
                    </CardHeader>
                    <CardContent className='flex justify-between'>
                        <div className='flex gap-2'>
                            <UsersIcon />
                            <div className='text-5xl font-bold'>8</div>
                        </div>
                        <div>
                            <Button nativeButton={false} render={<Link href="/dashboard/employees" />}>
                                View All
                            </Button>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className={'pb-2'}>
                        <CardTitle className='text-base flex justify-between'>
                            <span>Team leaders</span>
                            <StarIcon className='text-yellow-500' />
                        </CardTitle>
                    </CardHeader>
                    <CardContent className='flex flex-wrap gap-2'>
                        <TooltipProvider>
                            {teamLeaders.map((teamLeader) => (
                                <Tooltip key={`${teamLeader.firstName}-${teamLeader.lastName}`}>
                                    <TooltipTrigger aria-label={`${teamLeader.firstName} ${teamLeader.lastName}`}>
                                        <Avatar>
                                            {teamLeader.avatar && (
                                                <AvatarImage
                                                    src={teamLeader.avatar}
                                                    alt={`${teamLeader.firstName} ${teamLeader.lastName}`}
                                                />
                                            )}
                                            <AvatarFallback>
                                                {teamLeader.firstName[0]}{teamLeader.lastName[0]}
                                            </AvatarFallback>
                                        </Avatar>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        {teamLeader.firstName} {teamLeader.lastName}
                                    </TooltipContent>
                                </Tooltip>
                            ))}
                        </TooltipProvider>
                    </CardContent>
                </Card>
                <Card className='min-w-0'>
                    <CardHeader className='pb-2'>
                        <CardTitle className='text-base flex items-center justify-between'>
                            <span>Team distribution</span>
                            <PieChartIcon />
                        </CardTitle>
                    </CardHeader>
                    <CardContent className='min-w-0'>
                        <TeamDistributionChart />
                    </CardContent>
                </Card>
            </div>
            <Card className={'my-4'}>
                <CardHeader>
                    <CardTitle className={'text-lg flex items-center gap-2'}>
                        <ListChecks />
                        <span>
                             Support tickets resolved
                        </span>
                    </CardTitle>
                </CardHeader>
                <CardContent className='pl-0'>
                    <SupportTicketsResolved />
                </CardContent>
            </Card>
        </>
    );
}
