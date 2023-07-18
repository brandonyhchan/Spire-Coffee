import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Cafe, Location, distance } from "../types/cafe";

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
  let output;

  const query = await context.prisma.cafe.findMany({
    select: {
      id: true,
      stringId: true,
      name: true,
      street: true,
      city: true,
      province: true,
      profilePhotoURL: true,
      location: true,
      busyness: true,
      noisiness: true,
      price: true,
    },
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
  if (args.distanceFilter < 25) {
    const cafeDistances: Cafe[] = [];
    query.forEach(function (cafe) {
      cafeDistances.push(calculateDistance(cafe, args.userLocation));
    });
    output = cafeDistances.filter(
      (cafe) => cafe.distance < args.distanceFilter
    );
  } else {
    output = query;
  }

  return output;
}

function calculateDistance(cafe: Cafe, args: Location): distance<Cafe> {
  // lat2 = args.location.latitude, lat1 = cafe.latitude
  // lon2 = args.location.longitude, lon1 = cafe.longitude
  const R = 6371; // Radius of Earth in km
  const dLat = degToRad(args.latitude - cafe.location.latitude);
  const dLong = degToRad(args.longitude - cafe.location.longitude);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(degToRad(cafe.location.latitude)) *
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

function degToRad(deg: number): number {
  return deg * (Math.PI / 180);
}

export async function getCafeInfo(parent, args, context, info) {
  return context.prisma.cafe.findUnique({
    where: { stringId: args.stringId },
  });
}
