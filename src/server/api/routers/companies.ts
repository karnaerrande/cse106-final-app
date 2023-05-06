import { Company } from "@prisma/client";
import { z } from "zod";

import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
} from "~/server/api/trpc";



export const companyRouter = createTRPCRouter({
    search: protectedProcedure
        .input(z.string())
        .query(({ ctx, input }) => {
            return ctx.prisma.company.findMany({
                where: {
                    OR: [
                        {
                            ticker: {
                                contains: input
                            }
                        },
                        {
                            cname: {
                                contains: input
                            }
                        }

                    ]
                }
            });

        }),
    getFavorites: protectedProcedure
        .input(z.object({ uid: z.string(), term: z.string() }))
        .query(({ ctx, input }) => {
            return ctx.prisma.user.findUnique({
                where: { id: input.uid },
                select: {
                    favoriteCompanies: {
                        where: {
                            OR: [
                                { ticker: { contains: input.term } },
                                { cname: { contains: input.term } }
                            ]
                        },
                        select: {
                            id: true,
                            cik_str: true,
                            ticker: true,
                            cname: true
                        }
                    }
                }
            });

        }),
    getAll: protectedProcedure.query(({ ctx }) => {
        return ctx.prisma.company.findMany();
    }),
    addFavorite: protectedProcedure
        .input(z.object({ uid: z.string(), cid: z.string() }))
        .mutation(({ ctx, input }) => {
            return ctx.prisma.company.update({
                where: { id: parseInt(input.cid) },
                data: {
                    favoritedBy: {
                        connect: { id: input.uid }
                    }
                }
            });

        }),
    removeFavorite: protectedProcedure
        .input(z.object({ uid: z.string(), cid: z.string() }))
        .mutation(({ ctx, input }) => {
            return ctx.prisma.user.update({
                where: { id: input.uid },
                data: {
                    favoriteCompanies: {
                        disconnect: { id: parseInt(input.cid) }
                    }
                }
            });
        }),
    getCompany:protectedProcedure
    .input(z.string())
    .query(({ctx,input})=>{
        return ctx.prisma.company.findFirst({
            where:{id:parseInt(input)}
        })
    }),
    getFeatures:protectedProcedure
    .input(z.string())
    .query(({ctx,input})=>{
        return ctx.prisma.company
        .findUnique({
          where: { id: parseInt(input) },
        })
        .features({
          include: {
            feature: true,
          },
        })
    })
});
