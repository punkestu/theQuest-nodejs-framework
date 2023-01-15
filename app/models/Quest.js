const { quest } = require("../../prisma/db");

const model = {
  ...quest,
  all: () => {
    return quest.findMany({
      include: {
        createdBy: true,
      },
    });
  },
  withSlug: (slug) => {
    return quest.findFirst({ where: { slug } });
  },
  api: {
    all: () => {
      return quest.findMany({
        select: {
          name: true,
          slug: true,
          point: true,
          description: true,
          createdAt: true,
          dateline: true,
          createdBy: {
            select: {
              username: true,
            },
          },
        },
      });
    },
    withSlug: (slug) => {
      return quest.findFirst({
        where: { slug },
        select: {
          name: true,
          slug: true,
          point: true,
          description: true,
          createdAt: true,
          dateline: true,
          createdBy: {
            select: {
              username: true,
            },
          },
        },
      });
    },
  },
};

module.exports = model;
