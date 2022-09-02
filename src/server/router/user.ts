import * as trpc from "@trpc/server";
import { hash } from "argon2";
import { createRouter } from "./context"
import { signUpSchema } from "../../constants/schemas";

export const userRouter = createRouter()
  .mutation("signup", {
    input: signUpSchema,
    resolve: async ({ input, ctx }) => {
      const { name, email, password } = input;

      const exists = await ctx.prisma.user.findFirst({
        where: { email },
      });

      if (exists) {
        throw new trpc.TRPCError({
          code: "CONFLICT",
          message: "User already exists.",
        });
      }

      const hashedPassword = await hash(password);

      const result = await ctx.prisma.user.create({
        data: { name, email, password: hashedPassword },
      });

      return {
        status: 201,
        message: "Account created successfully",
        result: result.email,
      };
    },
  });

