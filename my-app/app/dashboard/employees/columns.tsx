"use client"

import { createColumnHelper } from "@tanstack/react-table"
import {DataTableFeatures} from "@/app/dashboard/components/data-table-features.ts";
import Image from "next/image";
import {Avatar, AvatarFallback} from "@/components/ui/avatar";
import {Badge} from "@/components/ui/badge";


// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Employee = {
    id: number,
    firstName: string,
    lastName: string,
    teamName: string,
    isTeamLeader: boolean,
    avatar?: string,
}

// Use `accessor` for data columns and `display` for columns without one.
const columnHelper = createColumnHelper<DataTableFeatures, Employee>()

export const columns = columnHelper.columns([
    columnHelper.accessor("avatar", {
        header: "Avatar",
        cell: ({row}) => {
            const avatar: string = row.getValue('avatar');
            const firstName: string = row.getValue('firstName');
            const lastName: string = row.getValue('lastName');

            return <Avatar>
                {!!avatar && <Image height={40} width={40} src={avatar} alt={`${firstName} ${lastName}`} />}
                {!avatar && <AvatarFallback className="uppercase">
                    {firstName[0] + lastName[0]}
                </AvatarFallback>}
            </Avatar>
        }
    }),
    columnHelper.accessor("firstName", {
        header: "First Name",
    }),
    columnHelper.accessor("lastName", {
        header: "Last Name",
    }),
    columnHelper.accessor("teamName", {
        header: "Team",
    }),
    columnHelper.accessor("isTeamLeader", {
        header: "Is leader",
        cell: ({row}) => {
            const isTeamLeader: boolean = row.getValue('isTeamLeader');

            return <div>{isTeamLeader ? <Badge variant='secondary' >Team Leader</Badge> : null}</div>
        }
    }),
])