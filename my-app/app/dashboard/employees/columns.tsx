"use client"

import { createColumnHelper } from "@tanstack/react-table"
import {DataTableFeatures} from "@/app/dashboard/components/data-table-features.ts";


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
    }),
])