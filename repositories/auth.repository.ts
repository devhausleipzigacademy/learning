import { db } from ".";
import { InviteDTO, InviteDTOSchema } from "@/shared/dtos/invite-dto";
import { InsertInvite, invitesTable } from "./schemas/auth";
import { eq } from "drizzle-orm";

export class AuthRepository {
  public async getInviteByEmail(email: string): Promise<InviteDTO | null> {
    const invite = await db
      .selectDistinct()
      .from(invitesTable)
      .where(eq(invitesTable.email, email))
      .then((res) => res[0]);

    if (!invite) return null;

    return InviteDTOSchema.parse(invite);
  }

  public async getInviteById(id: string): Promise<InviteDTO | null> {
    const invite = await db
      .selectDistinct()
      .from(invitesTable)
      .where(eq(invitesTable.id, id))
      .then((res) => res[0]);

    if (!invite) return null;

    return InviteDTOSchema.parse(invite);
  }

  public async createInvite({
    email,
    status,
    firstName,
    role,
  }: InsertInvite): Promise<InviteDTO> {
    const newInvite = await db
      .insert(invitesTable)
      .values({
        email,
        firstName,
        status,
        role,
      })
      .returning()
      .then((res) => res[0]);

    return InviteDTOSchema.parse(newInvite);
  }

  public async removeInvite(id: string): Promise<InviteDTO | null> {
    const deletedInvite = await db
      .delete(invitesTable)
      .where(eq(invitesTable.id, id))
      .returning()
      .then((res) => res[0]);

    if (!deletedInvite) return null;

    return InviteDTOSchema.parse(deletedInvite);
  }

  public async removeInviteByEmail(email: string): Promise<InviteDTO | null> {
    const deletedInvite = await db
      .delete(invitesTable)
      .where(eq(invitesTable.email, email))
      .returning()
      .then((res) => res[0]);

    if (!deletedInvite) return null;

    return InviteDTOSchema.parse(deletedInvite);
  }

  public async getAllInvites(): Promise<InviteDTO[]> {
    const invites = await db.select().from(invitesTable);
    return invites.map((invite) => InviteDTOSchema.parse(invite));
  }

  public async updateInvite(
    id: string,
    data: Partial<InsertInvite>
  ): Promise<InviteDTO> {
    const updatedInvite = await db
      .update(invitesTable)
      .set(data)
      .where(eq(invitesTable.id, id))
      .returning()
      .then((res) => res[0]);
    return InviteDTOSchema.parse(updatedInvite);
  }
}

export const authRepository = new AuthRepository();
