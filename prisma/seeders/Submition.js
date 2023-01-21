const prisma = require("../db");

async function main() {
  await prisma.submition.create({
    data: {
      createdBy: {
        connect: {
          username: "minerva",
        },
      },
      theQuest: {
        connect: {
          slug: "test1234-quest",
        },
      },
      theFile: {
        connect: {
          fileName: "file1",
        },
      },
      comment: "test",
    },
  });
}

main().then(async () => {
  const allUser = await prisma.submition.findMany();
  console.dir(allUser);
});
