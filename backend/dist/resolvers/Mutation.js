export async function updateUserInfo(parent, args, context, info) {
    return context.prisma.user.update({
        where: { userName: args.userName },
        data: { firstName: args.firstName },
    });
}
