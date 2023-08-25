import * as bcrypt from "bcrypt";
export async function updateUserInfo(parent, args, context, info) {
    try {
        // const password = await bcrypt.hash(args.password, 10);
        return await context.prisma.user.update({
            where: { userName: args.userName },
            data: {
                firstName: args.firstName,
                lastName: args.lastName,
                email: args.email,
                // password: password,
            },
        });
    }
    catch (error) {
        throw new Error("Error updating user info.");
    }
}
export async function updatePassword(parent, args, context, info) {
    try {
        const password = await bcrypt.hash(args.password, 10);
        return await context.prisma.user.update({
            where: { userName: args.userName },
            data: { password: password },
        });
    }
    catch {
        throw new Error("Error updating user password.");
    }
}