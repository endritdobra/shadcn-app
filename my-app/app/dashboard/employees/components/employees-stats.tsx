import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {BadgeCheckIcon, UserCheck2, UserIcon} from "lucide-react";
import {Button} from "@/components/ui/button";
import Link from "next/link";

export default function EmployeesStats() {
    const totalEmployees = 100;
    const employeesPresent = 80;
    const employeesPresentPercentage = (employeesPresent / totalEmployees) * 100;

    return (
        <div className='grid lg:grid-cols-3 gap-4'>
            <Card>
                <CardHeader>
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
                <CardHeader>
                    <CardTitle className='text-base'>Employees present</CardTitle>
                </CardHeader>
                <CardContent className='flex justify-between'>
                    <div className='flex gap-2'>
                        <UserCheck2 />
                        <div className='text-5xl font-bold'>100</div>
                    </div>
                </CardContent>
                <CardFooter>
                    <span className={'text-xs text-green-500 flex gap-1 items-center'}>
                        <BadgeCheckIcon />
                        80% of employees are present
                    </span>
                </CardFooter>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className='text-base'>Employee of the month</CardTitle>
                </CardHeader>
                <CardContent className='flex justify-between'>
                    <div className='flex gap-2'>
                        <UserCheck2 />
                        <div className='text-5xl font-bold'>{employeesPresent}</div>
                    </div>
                </CardContent>
                <CardFooter>
                    <span>
                        {employeesPresentPercentage}% of employees are present
                    </span>
                </CardFooter>
            </Card>
        </div>
    );
}
