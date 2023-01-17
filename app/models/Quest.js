const { quest } = require("../../prisma/db");
const slugify = require("slugify");

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
    return quest.findFirst({
      where: { slug },
      include: {
        createdBy: true,
      },
    });
  },
  nameExist: async (name) => {
    const slug = slugify(name, { remove: /[*+~.()'"!:@]/g });
    const _quest = await quest.findFirst({
      where: {
        name,
        slug,
      },
    });
    return _quest != null;
  },
  delete: {
    withSlug: (slug) => {
      return quest.delete({
        where: {
          slug,
        },
      });
    },
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
