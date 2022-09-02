import type { NextPage } from "next";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreatePostInput, createPostSchema } from "../../constants/schemas";
import { useRouter } from "next/router";
import { trpc } from '../../utils/trpc'
import { useSession } from "next-auth/react";


const CreatePost: NextPage = () => {
  const { handleSubmit, register } = useForm<CreatePostInput>();

  const router = useRouter();

  const { mutate, error } = trpc.useMutation(['post.create-post'], {
    onSuccess: ({ id }) => {
      router.push(`/post/${id}`)
    },
  })

  function onSubmit(values: CreatePostInput) {
    mutate(values)
  }

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content  w-full">
        <div className="max-w-3xl w-full">
          <h1 className="text-5xl text-center font-bold leading-snug text-gray-400 mb-10">
            Create New Post
          </h1>
          <form className="flex items-center justify-center w-full"
            onSubmit={handleSubmit(onSubmit)}
          >
          {error && error.message}
          <div className="card w-full bg-base-100 shadow-xl">
            <div className="card-body">
              <input
                type="text"
                placeholder="Post Title"
                className="input input-bordered w-full my-2"
                {...register("title")}
              />
              <input
                type="email"
                placeholder="Post Description"
                className="input input-bordered w-full"
                {...register("description")}
              />
              <textarea
                placeholder="Post Body"
                className="textarea textarea-bordered w-full my-2"
                {...register("body")}
              />
              <div className="card-actions items-center justify-between">
                <button className="btn btn-secondary" type="submit">
                  Create
                </button>
              </div>
            </div>
          </div>
        </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;