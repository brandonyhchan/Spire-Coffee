import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../context";
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
const xprisma = prisma.$extends();
export async function returnAllCafes(parent, args, context, info) {
    return context.prisma.cafe.findMany({
        where: {
            name: { contains: args.filterByName, mode: "insensitive" },
            busyness: args.busyFilter,
            noisiness: args.noiseFilter,
            price: { in: args.priceFilter.length ? args.priceFilter : undefined },
            // distance: { lte: args.distanceFilter },
        },
        orderBy: {
            id: "asc",
        },
    });
}
function calculateDistance(cafe, args) {
    // lat2 = args.location.latitude, lat1 = cafe.latitude
    // lon2 = args.location.longitude, lon1 = cafe.longitude
    const R = 6371; // Radius of Earth in km
    const dLat = degToRad(args.latitude - cafe.latitude);
    const dLong = degToRad(args.longitude - cafe.longitude);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(degToRad(cafe.latitude)) *
            Math.cos(degToRad(args.latitude)) *
            Math.sin(dLong / 2) *
            Math.sin(dLong / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = Math.round(R * c);
    return {
        ...cafe,
        distance: d,
    };
}
function degToRad(deg) {
    return deg * (Math.PI / 180);
}
export async function getCafeInfo(parent, args, context, info) {
    return context.prisma.cafe.findUnique({
        where: { stringId: args.stringId },
    });
}
