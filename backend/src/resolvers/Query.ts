import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function signUp(parent, args, context, info) {
  try {
    const password = await bcrypt.hash(args.password, 10);
    const user = await context.prisma.user.create({
      data: { ...args, password },
    });
    const token = jwt.sign(
      { userId: user.id, userName: user.userName },
      <jwt.Secret>process.env.PRIVATE_KEY,
      { algorithm: "RS256" }
    );
    return {
      token,
      user,
    };
  } catch (error) {
    throw new Error("User already exists");
  }
}

export async function login(parent, args, context, info) {
  const user = await context.prisma.user.findUnique({
    where: { userName: args.userName },
  });
  if (!user) {
    throw new Error("No such user found");
  }
  const valid = await bcrypt.compare(args.password, user.password);
  if (!valid) {
    throw new Error("Invalid password");
  }
  const token = jwt.sign(
    { userId: user.id, userName: user.userName },
    <jwt.Secret>process.env.PRIVATE_KEY,
    { algorithm: "RS256" }
  );
  return {
    token,
    user,
  };
}

export async function returnAllCafes(parent, args, context, info) {
  return context.prisma.cafe.findMany({
    where: {
      // OR: [
      //   { price: { contains: args.priceFilter[0] } },
      //   { price: { contains: args.priceFilter[1] } },
      //   { price: { contains: args.priceFilter[2] } },
      // ],
      name: { contains: args.filterByName, mode: "insensitive" },
      busyness: args.busyFilter,
      noisiness: args.noiseFilter,
      // OR: [test(args.priceFilter)],
    },
  });
}

// function test(priceArray: string[]) {
//   const array: object[] = [];
//   for (let i = 0; i < priceArray.length; i++) {
//     array.push(...array, {
//       price: priceArray[i],
//     });
//   }
//   console.log(array);
// }
