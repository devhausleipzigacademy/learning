import { assertAuthenticated } from "@/lib/session";
import { authRepository } from "@/repositories/auth.repository";
import { userRepository } from "@/repositories/user.repository";

export default async function Page() {
  const user = await assertAuthenticated();
  const users = await userRepository.getAllUsers();
  const invites = await authRepository.getAllInvites();
  return (
    <div className="space-y-2">
      <h2 className="font-medium">Users</h2>
      <pre>{JSON.stringify(users, null, 2)}</pre>
      <h2 className="font-medium">Invites</h2>
      <pre>{JSON.stringify(invites, null, 2)}</pre>
    </div>
  );
}
