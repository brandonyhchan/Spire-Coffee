export async function updateCafeInfo(parent, args, context, info) {
  return context.prisma.cafe.update({
      where: { stringId: args.stringId },
      data: { busyness: args.busyness, noisiness: args.noisiness },
  });
}
