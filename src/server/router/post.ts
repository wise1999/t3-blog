import { prisma } from "../db/client"
import { Prisma } from "@prisma/client"
import { TRPCError } from "@trpc/server"
import { z } from "zod"
import { createRouter } from "./context"
import { createPostSchema } from "../../constants/schemas"

const defaultPostSelect = Prisma.validator<Prisma.PostSelect>()({
  id: true, title: true, description: true, body: true, createdAt: true
})

export const postRouter = createRouter()
  .mutation('create-post', {
    input: createPostSchema,
    async resolve({ ctx, input }) {

      if (!ctx?.session) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'Can not create a post while logged out',
        })
      }

      const id = ctx.session.id as string

      const post = await prisma.post.create({
        data: {
          ...input,
          user: {
            connect: {
              id,
            },
          },
        },
      })

      return post
    },
  })

  .query('all', {
    async resolve() {
      return prisma.post.findMany({
        select: defaultPostSelect,
      })
    },
  })

  .query('byId', {
    input: z.object({ id: z.string() }),
    async resolve({ input }) {
      const { id } = input
      const post = await prisma.post.findUnique({
        where: { id },
        select: defaultPostSelect,
      })
      if (!post) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No post with id '${id}'`,
        })
      }
      return post
    },
  })