import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Skeleton} from "@/components/ui/skeleton";

export default function Loading(){
    return <>
        <Skeleton className={"size-10 rounded-full"} />
        <Skeleton className={"h-8 w-full"} />
        <Skeleton className={"h-8 w-full"} />
        <Skeleton className={"h-8 w-full"} />
        <Skeleton className={"h-8 w-full"} />
        <Skeleton className={"size-10 rounded-full"} />
        <Skeleton className={"h-8 w-full"} />
        <Skeleton className={"h-8 w-full"} />
        <Skeleton className={"h-8 w-full"} />
        <Skeleton className={"h-8 w-full"} />
    </>;
}