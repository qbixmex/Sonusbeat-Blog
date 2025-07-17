import prisma from "../lib/prisma";
import bcrypt from "bcryptjs";
import { initialData } from "./seeds";
import { User } from "../interfaces/user.interface";
import { Category } from "../interfaces/category.interface";

const main = async () => {

  console.log("Clearing the data 🧹 ...")

  try {
    const articlesCount = await prisma.article.count();
    console.log("Articles Count:", articlesCount);
    if (articlesCount > 0) {
      const response = await prisma.article.deleteMany();
      console.log("Articles Deleted:", response.count);
    }
  } catch (error) {
    console.error("Error deleting articles:", (error as Error).message);
  }

  try {
    const categoriesCount = await prisma.category.count();
    console.log("Categories Count:", categoriesCount);
    if (categoriesCount > 0) {
      const response = await prisma.category.deleteMany();
      console.log("Categories Deleted:", response.count);
    }
  } catch (error) {
    console.error("Error deleting categories:", (error as Error).message);
  }

  try {
    const usersCount = await prisma.user.count();
    console.log("Users Count:", usersCount);
    if (usersCount > 0) {
      const response = await prisma.user.deleteMany();
      console.log("Users Deleted:", response.count);
    }
  } catch (error) {
    console.error("Error deleting users:", (error as Error).message);
  }

  console.log("All data cleared successfully! 👍");

  console.log('Seed started 🚀');

  const { users, categories, articles } = initialData;

  const usersData = users.map((user) => {
    const encryptedPassword = bcrypt.hashSync(user.password, 10);

    return {
      ...user,
      password: encryptedPassword,
    }
  });

  // Perform to save the users in the database
  console.log('Saving users to the database ⏳ ...');

  await prisma.user.createMany({ data: usersData });

  console.log('Users Inserted 👍');

  await prisma.category.createMany({ data: categories });

  console.log('Categories Inserted 👍');

  const usersDB = await prisma.user.findMany({
    select: {
      id: true,
      username: true,
    },
  }) as Pick<User, 'id' | 'username'>[];

  const categoriesDB = await prisma.category.findMany({
    select: {
      id: true,
      name: true,
      slug: true,
    },
  }) as Pick<Category, 'id' | 'slug'>[];

  const usersMap = usersDB.reduce((map, user) => {
    map[user.username.toLowerCase()] = user.id as string;
    return map;
  },
    // <user_name, user_id>
    // example -> { id: '38Yvd5B7-...', name: 'John Doe' },
    {} as Record<string, string>
  );

  const categoriesMap = categoriesDB.reduce((map, category) => {
    map[category.slug.toLowerCase()] = category.id as string;
    return map;
  },
    // <category_name, category_id>
    // example -> { id: '569202b7-...', name: 'Javascript' },
    {} as Record<string, string>
  );

  articles.forEach(async (article) => {
    const { category, author, ...attributesRest } = article;

    await prisma.article.create({
      data: {
        ...attributesRest,
        authorId: usersMap[(author as string).toLowerCase()],
        categoryId: categoriesMap[(category as string).toLowerCase()],
      },
    });
  });

  console.log('Articles Inserted 👍');

  console.log('Seed executed 🎉');
};

(() => {
  if (process.env.NODE_ENV === 'production') return;
  main();
})();