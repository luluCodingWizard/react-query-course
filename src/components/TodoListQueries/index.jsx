import React from "react";
import { useQueries } from "@tanstack/react-query";

const Index = () => {
  const ids = [1, 2, 3, 4];

  const queries = useQueries({
    queries: ids.map((id) => {
      return {
        queryKey: ["todo", id],
        queryFn: () =>
          fetch(`https://jsonplaceholder.typicode.com/todos/${id}`).then(
            (response) => response.json()
          ),
      };
    }),
    combine: (results) => {
      return {
        data: results.map((result) => result.data),
        pending: results.some((result) => result.isPending),
      };
    },
  });

  console.log(queries);
  if (queries.pending) {
    return <div>Loading......</div>;
  }

  return (
    <div className="container mx-auto mt-10">
      <div className="flex flex-col ">
        <h1 className="text-2xl font-bold items-center mb-6">Todo List</h1>
        <ul>
          {queries.data?.map((todo) => (
            <li
              key={todo.id}
              className="flex  mb-4 bg-gray-200 rounded-md  items-center p-2"
            >
              <input
                type="checkbox"
                checked={todo.isCompleted}
                onChange={() => {}}
                className="mr-2 h-4 w-4"
              />
              <span className={todo.isCompleted ? "line-through" : undefined}>
                {todo.title}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Index;
