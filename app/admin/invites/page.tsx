import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { authRepository } from "@/repositories/auth.repository";
import { type Invite } from "@/repositories/schemas/auth";
import { format } from "date-fns";
import {
  CircleCheckIcon,
  CircleHelpIcon,
  SendHorizonalIcon,
} from "lucide-react";
import { InviteDialog } from "./invite-dialog";
import { InviteActions } from "./invite-actions";

const inviteStatusMap: Record<
  Invite["status"],
  { color: string; icon: JSX.Element }
> = {
  pending: { color: "bg-green-500", icon: <SendHorizonalIcon /> },
  requested: { color: "bg-yellow-500", icon: <CircleHelpIcon /> },
  rejected: { color: "bg-red-500", icon: <CircleCheckIcon /> },
};

export default async function Page() {
  const invites = await authRepository.getAllInvites();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Invites</CardTitle>
        <CardDescription>
          Manage all sent and requested invites.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-background">
              <TableHead>User</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden sm:table-cell">Date</TableHead>
              <TableHead className="hidden sm:table-cell">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invites.map((invite) => (
              <TableRow key={invite.id} className="hover:bg-background">
                <TableCell>
                  <div className="font-medium">{invite.email}</div>
                  <div className="hidden text-sm text-muted-foreground md:inline">
                    {invite.firstName}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    className={cn(
                      "text-xs bg-opacity-50",
                      inviteStatusMap[invite.status].color
                    )}
                    variant="outline"
                  >
                    {invite.status}
                  </Badge>
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  {format(invite.createdAt, "dd-MM-yyyy")}
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  <InviteActions invite={invite} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="justify-end">
        {/* TODO: don't like the button there, find a better solution */}
        <InviteDialog />
      </CardFooter>
    </Card>
  );
}
