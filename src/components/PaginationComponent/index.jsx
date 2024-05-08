import React from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

const Index = ({ page, setPage }) => {
  const fetshPosts = async () => {
    const response = await fetch(
      `http://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=2`
    );
    return response.json();
  };
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["posts", page],
    queryFn: fetshPosts,
    placeholderData: keepPreviousData,
  });

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  if (isPending) return <div className="text-center">Loading...</div>;
  if (isError)
    return <div className="text-center text-red-500">{error.message}</div>;

  return (
    <div>
      <div className=" text-lg font-bold my-4">Current page is: {page}</div>
      {data.map((post) => (
        <div key={post.id} className="border border-gray-300 p-4 mb-4 rounded">
          <h2 className="text-lg font-bold mb-2">{post.title}</h2>
          <p className="text-gray-700">{post.body}</p>
        </div>
      ))}
      <div className="flex justify-between mt-4">
        <button
          className={`py-2 px-4 rounded-md bg-blue-500 text-white ${
            page === 1 && "opacity-50 cursor-not-allowed"
          }`}
          onClick={handlePrevPage}
        >
          Previous Page
        </button>
        <button
          className="py-2 px-4 rounded-md bg-blue-500 text-white"
          onClick={handleNextPage}
        >
          Next Page
        </button>
      </div>
    </div>
  );
};

export default Index;
