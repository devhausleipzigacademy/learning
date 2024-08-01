import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { authRepository } from "@/repositories/auth.repository";
import { type Invite } from "@/repositories/schemas/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Card,
  CardContent,
  CardDescription,
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
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import {
  CircleCheckIcon,
  CircleHelpIcon,
  MoreVerticalIcon,
  PencilIcon,
  SendHorizonalIcon,
  SendIcon,
  Trash2Icon,
  UserIcon,
} from "lucide-react";

const inviteStatusMap: Record<
  Invite["status"],
  { color: string; icon: JSX.Element }
> = {
  pending: { color: "bg-yellow-500", icon: <SendHorizonalIcon /> },
  requested: { color: "bg-orange-500", icon: <CircleHelpIcon /> },
  approved: { color: "bg-green-500", icon: <CircleCheckIcon /> },
  rejected: { color: "bg-red-500", icon: <CircleCheckIcon /> },
};

const actions = [
  { label: "Edit", icon: PencilIcon },
  { label: "Resend", icon: SendIcon },
  null,
  { label: "Delete", icon: Trash2Icon },
];

export default async function Page() {
  const invites = await authRepository.getAllInvites();
  return (
    <Card>
      <CardHeader className="px-7">
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
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="icon" variant="outline" className="h-8 w-8">
                        <MoreVerticalIcon className="h-3.5 w-3.5" />
                        <span className="sr-only">More</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {actions.map((action, idx) =>
                        action ? (
                          <DropdownMenuItem
                            key={idx}
                            className="flex items-center gap-2"
                          >
                            <action.icon className="size-4" /> {action.label}
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuSeparator key={idx} />
                        )
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
