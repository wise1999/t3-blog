import type { GetServerSideProps, GetServerSidePropsContext } from "next";
import { unstable_getServerSession as getServerSession } from "next-auth";

import { authOptions } from "./[...nextauth]";

export const requireAuth =
  (func: GetServerSideProps) => async (ctx: GetServerSidePropsContext) => {
    const session = await getServerSession(ctx.req, ctx.res, authOptions);

    // if (!session) {
    //   return {
    //     redirect: {
    //       destination: "/sign-in", // login path
    //       permanent: false,
    //     },
    //   };
    // }

    return await func(ctx);
  };