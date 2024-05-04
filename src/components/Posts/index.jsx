import React from "react";
import { useQuery } from "@tanstack/react-query";
import CreatePostForm from "../CreatePostForm";

const Index = () => {
  const { data, isPending, isError, error, fetchStatus, isSuccess } = useQuery({
    queryFn: () =>
      fetch("https://jsonplaceholder.typicode.com/posts").then((response) =>
        response.json()
      ),
    queryKey: ["posts"],
  });
  if (isPending) {
    return <div>loading .....</div>;
  }
  if (isError) {
    return <div>{error.message}</div>;
  }

  return (
    <div className="container mx-auto mt-10">
      <CreatePostForm />
      <div className="flex flex-col ">
        <h1 className="text-2xl font-bold items-center mb-6"></h1>

        {data?.map((post) => (
          <div
            key={post.id}
            className="bg-white mt-2 rounded-lg shadow-lg p-4 flex flex-col"
          >
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="text-gray-700 mt-2">{post.body}</p>
            <div className="mt-auto">
              <button
                onClick={() => {}}
                className="bg-blue-500 text-sm hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-l"
              >
                Update
              </button>
              <button
                onClick={() => {}}
                className="bg-red-500 text-sm hover:bg-red-700 text-white font-bold py-2 px-4 rounded-r"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Index;
