import type { NextPage } from "next"
import { useRouter } from "next/router"
import Head from "next/head"
import { DefaultQueryCell } from "../../utils/DefaultQueryCell"
import { trpc } from "../../utils/trpc"

const PostPage: NextPage = () => {
  const id = useRouter().query.id as string
  const postQuery = trpc.useQuery([
    'post.byId',
    { id }
  ])

  return (
    <DefaultQueryCell
      query={postQuery}
      success={({ data }) => (
        <>
          <Head>
            <title>{data.title}</title>
            <meta name="description" content={data.description} />
          </Head>

          <main>
            <h1>{data.title}</h1>
            <p>{data.body}</p>
            <em>
              Created {data.createdAt.toLocaleDateString()}
            </em>
          </main>
        </>
      )}
    />
  )
}

export default PostPage