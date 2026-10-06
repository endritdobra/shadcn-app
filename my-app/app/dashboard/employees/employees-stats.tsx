import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {BadgeCheckIcon, LaptopIcon, PartyPopperIcon, UserCheck2, UserIcon} from "lucide-react";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import WorkLocationTrends from "@/app/dashboard/employees/work-location-trends";

export default function EmployeesStats() {
    const totalEmployees = 100;
    const employeesPresent = 80;
    const employeesPresentPercentage = (employeesPresent / totalEmployees) * 100;

    return (
        <>
            <div className='grid lg:grid-cols-3 gap-4'>
                <Card>
                    <CardHeader className={'pb-2'}>
                        <CardTitle className='text-base'>Total employees</CardTitle>
                    </CardHeader>
                    <CardContent className='flex justify-between'>
                        <div className='flex gap-2'>
                            <UserIcon />
                            <div className='text-5xl font-bold'>{totalEmployees}</div>
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
                        <CardTitle className='text-base'>Employees present</CardTitle>
                    </CardHeader>
                    <CardContent className='flex justify-between'>
                        <div className='flex gap-2'>
                            <UserCheck2 />
                            <div className='text-5xl font-bold'>{employeesPresent}</div>
                        </div>
                    </CardContent>
                    <CardFooter>
                    <span className={'text-xs text-green-500 flex gap-1 items-center'}>
                        <BadgeCheckIcon />
                        {employeesPresentPercentage}% of employees are present
                    </span>
                    </CardFooter>
                </Card>
                <Card className={'border-pink-500 flex flex-col'}>
                    <CardHeader className={'pb-2'}>
                        <CardTitle className='text-base'>Employee of the month</CardTitle>
                    </CardHeader>
                    <CardContent className='flex gap-2 items-center text-xs text-muted-foreground'>
                        <Avatar>
                            <AvatarImage src="/cm.jpg" alt="Employee of the month" />
                            <AvatarFallback>CM</AvatarFallback>
                        </Avatar>
                        <span>Endos Endos</span>
                    </CardContent>
                    <CardFooter className={'flex gap-2 items-center text-xs text-muted-foreground mt-auto'}>
                        <PartyPopperIcon className={'text-pink-500'} />
                        <span>Congratulations</span>
                    </CardFooter>
                </Card>
            </div>
            <Card className={'my-4'}>
                <CardHeader>
                    <CardTitle className={'text-lg flex items-center gap-2'}>
                        <LaptopIcon />
                        <span>
                             Employees work location trends
                        </span>
                    </CardTitle>
                </CardHeader>
                <CardContent className='pl-0'>
                    <WorkLocationTrends />
                </CardContent>
            </Card>
        </>
    );
}
