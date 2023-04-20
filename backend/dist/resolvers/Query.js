import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export async function signUp(parent, args, context, info) {
    try {
        const password = await bcrypt.hash(args.password, 10);
        const user = await context.prisma.user.create({
            data: { ...args, password },
        });
        const token = jwt.sign({ userId: user.id, userName: user.userName }, process.env.PRIVATE_KEY, { algorithm: "RS256" });
        return {
            token,
            user,
        };
    }
    catch (error) {
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
    const token = jwt.sign({ userId: user.id, userName: user.userName }, process.env.PRIVATE_KEY, { algorithm: "RS256" });
    return {
        token,
        user,
    };
}
export async function returnAllCafes(parent, args, context, info) {
    // const lastPostInResults = firstQueryResults[3]; // Remember: zero-based index! :)
    // const myCursor = lastPostInResults.id; // Example: 29
    // TODO: see prisma on pagination https://www.prisma.io/docs/concepts/components/prisma-client/pagination
    return context.prisma.cafe.findMany({
        where: {
            name: { contains: args.filterByName, mode: "insensitive" },
            busyness: args.busyFilter,
            noisiness: args.noiseFilter,
            price: { in: args.priceFilter.length ? args.priceFilter : undefined },
        },
        orderBy: {
            id: "asc",
        },
    });
}
