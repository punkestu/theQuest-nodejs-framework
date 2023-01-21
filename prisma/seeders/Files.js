const prisma = require("../db");

async function main() {
  await prisma.file.createMany({
    data: [
      {
        fileName: "file1",
      },
      {
        fileName: "file2",
      },
      {
        fileName: "file3",
      },
    ],
  });
}

main().then(async () => {
  const allUser = await prisma.file.findMany();
  console.dir(allUser);
});
