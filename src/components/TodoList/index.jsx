import React from "react";
import { useQuery } from "@tanstack/react-query";

const Index = () => {
  const { data } = useQuery({
    queryFn: () =>
      fetch("https://jsonplaceholder.typicode.com/todos").then((response) =>
        response.json()
      ),
    queryKey: "todos",
  });
  return (
    <div className="container mx-auto mt-10">
      <div className="flex flex-col ">
        <h1 className="text-2xl font-bold items-center mb-6">Todo List</h1>
        <ul>
          {data.map((todo) => (
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
