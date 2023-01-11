const prisma = require("../db");

async function main() {
  await prisma.user.createMany({
    data: [
      {
        username: "minerva",
        email: "minerva@mail.com",
        password: "test1234",
      },
    ],
  });
}

main().then(async () => {
  const allUser = await prisma.user.findMany();
  console.dir(allUser);
});
