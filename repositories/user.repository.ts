import { UserDTO, UserDTOSchema } from "@/shared/dtos/user-dto";
import { db } from ".";
import { InsertUser, usersTable } from "./schemas/user";
import { eq } from "drizzle-orm";

export class UserRepository {
  public async getUserById(id: string): Promise<UserDTO | null> {
    const user = await db
      .selectDistinct()
      .from(usersTable)
      .where(eq(usersTable.id, id))
      .then((res) => res[0]);
    if (!user) return null;
    return UserDTOSchema.parse(user);
  }

  public async getUserByEmail(email: string): Promise<UserDTO | null> {
    const user = await db
      .selectDistinct()
      .from(usersTable)
      .where(eq(usersTable.email, email))
      .then((res) => res[0]);
    if (!user) return null;
    return UserDTOSchema.parse(user);
  }

  public async getUserByGithubId(githubId: number): Promise<UserDTO | null> {
    const user = await db
      .selectDistinct()
      .from(usersTable)
      .where(eq(usersTable.githubId, githubId))
      .then((res) => res[0]);
    if (!user) return null;
    return UserDTOSchema.parse(user);
  }

  public async createUser(user: InsertUser): Promise<UserDTO> {
    const newUser = await db
      .insert(usersTable)
      .values(user)
      .returning()
      .then((res) => res[0]);
    return UserDTOSchema.parse(newUser);
  }

  public async getAllUsers(): Promise<UserDTO[]> {
    const users = await db.select().from(usersTable);
    return users.map((user) => UserDTOSchema.parse(user));
  }

  public async removeUserByEmail(email: string): Promise<UserDTO | null> {
    const deletedUser = await db
      .delete(usersTable)
      .where(eq(usersTable.email, email))
      .returning()
      .then((res) => res[0]);

    if (!deletedUser) return null;

    return UserDTOSchema.parse(deletedUser);
  }
}

export const userRepository = new UserRepository();
