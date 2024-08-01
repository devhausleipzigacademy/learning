import { db } from "@/repositories";
import { usersTable } from "./repositories/schemas/user";
import { userRepository } from "./repositories/user.repository";
import { generateIdFromEntropySize } from "lucia";

try {
  const adminEmail = "danielmcatee@me.com";
  console.log("🌱 Seeding...");
  const users = await userRepository.getAllUsers();
  console.log(users);

  console.time(`🌱 Database has been seeded`);

  console.time("🧹 Cleaned up the database...");
  const adminUser = await userRepository.getUserByEmail(adminEmail);
  if (adminUser) {
    await userRepository.removeUserByEmail(adminEmail);
  }
  console.timeEnd("🧹 Cleaned up the database...");

  console.time(`🐨 Created admin user`);
  await db.insert(usersTable).values({
    id: generateIdFromEntropySize(10),
    email: adminEmail,
    githubId: 17494342,
    username: "dnmct",
    name: "Dan McAtee",
    avatarUrl: "https://avatars.githubusercontent.com/u/17494342?v=4",
    role: "admin",
  });
  console.timeEnd(`🐨 Created admin user`);
  console.timeEnd(`🌱 Database has been seeded`);
} catch (e) {
  console.error(e);
} finally {
  process.exit(0);
}
