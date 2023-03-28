import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export async function signUp(parent, args, context, info) {
    try {
        const password = await bcrypt.hash(args.password, 10);
        const user = await context.prisma.user.create({
            data: { ...args, password },
        });
        const token = jwt.sign({ userId: user.id, userName: user.userName }, process.env.PRIVATE_KEY, { expiresIn: "3h", algorithm: "RS256" });
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
    const token = jwt.sign({ userId: user.id, userName: user.userName }, process.env.PRIVATE_KEY, { expiresIn: "3h", algorithm: "RS256" });
    return {
        token,
        user,
    };
}
