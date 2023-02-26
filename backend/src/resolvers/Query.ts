import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

import { APP_SECRET } from '../utils';

export async function signup(parent, args, context, info) {
    try {
        const password = await bcrypt.hash(args.password, 10);
        const user = await context.prisma.user.create({data: {...args, password } });
        const token = jwt.sign({userId: user.id }, APP_SECRET);
        return {
            token,
            user,
        };
    } catch (error) {
        throw new Error("User already exists");
    }
};

export async function login(parent, args, context, info) {
    const user = await context.prisma.user.findUnique({where: {username: args.username}})
    if (!user) {
        throw new Error("No such user found");
    }
    const valid = await bcrypt.compare(args.password, user.password);
    if (!valid) {
        throw new Error("Invalid password");
    }
    const token = jwt.sign({userId: user.id}, APP_SECRET);
    return {
        token,
        user,
    }
}
