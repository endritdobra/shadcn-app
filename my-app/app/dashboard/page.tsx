import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import EmployeesStats from "@/app/dashboard/employees/employees-stats";
import TeamStats from "@/app/dashboard/teams/teams-stats";

export default function DashboardPage() {
  return (
    <Tabs defaultValue="employees">
        <TabsList className='mb-4'>
            <TabsTrigger value='employees'>Employees stats</TabsTrigger>
            <TabsTrigger value='teams'>Teams stats</TabsTrigger>
        </TabsList>
        <TabsContent value='employees'>
            <EmployeesStats />
        </TabsContent>
        <TabsContent value='teams'>
            <TeamStats />
        </TabsContent>
    </Tabs>
  );
}