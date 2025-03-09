import { Card } from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

export function TableSkeleton() {
  return (
    <Card className="rounded-lg border-none bg-white">
      <Table>
        <TableHeader className="py-1">
          <TableRow>
            <TableHead className="w-[28px]">
              <Skeleton className="h-4 w-4" />
            </TableHead>
            <TableHead>AMOUNT</TableHead>
            <TableHead>TRANSACTION ID</TableHead>
            <TableHead>TRANSACTION TYPE</TableHead>
            <TableHead>DATE</TableHead>
            <TableHead>TIME</TableHead>
            <TableHead>STATUS</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[0, 1, 2, 3, 4, 6, 7, 8].map((_, i) => (
            <TableRow key={i}>
              <TableCell className="w-[28px]">
                <Skeleton className="h-4 w-4" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-[100px]" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-[120px]" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-[100px]" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-[100px]" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-[80px]" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-6 w-[100px] rounded-full" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
