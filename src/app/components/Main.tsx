import React from "react";

function Main({ children }: { children: React.ReactNode }) {
  return (
    <div className=" flex flex-1  flex-col h-screen justify-center sm:justify-start items-start">
      {children}
    </div>
  );
}

export default Main;
