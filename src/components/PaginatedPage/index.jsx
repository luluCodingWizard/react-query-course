import React, { useState } from "react";
import PaginationComponent from "../PaginationComponent";

const Index = () => {
  const [page, setPage] = useState(1);
  return (
    <div className="p-4">
      <h1>Pagination Example</h1>
      <PaginationComponent page={page} setPage={setPage} />
    </div>
  );
};

export default Index;
