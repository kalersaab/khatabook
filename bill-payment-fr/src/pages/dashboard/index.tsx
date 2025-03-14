import Layout from "@/components/layout";
import NavBar from "@/components/navbar";
import { list } from "@/extra";
import Link from "next/link";
import React from "react";

function Dashboard() {
  return (
    <Layout>
      <NavBar />
      <div className="p-4">
        <div className="flex font-bold text-lime-500 hover:text-amber-500 cursor-pointer text-5xl p-36">
          Welcome to bill Payments
        </div>
        <div className="grid grid-cols-4 gap-4">
          {list &&
            list.map((item) => (
              <Link href={item.href ? item.href : ""} key={item.id}>
                <div
                  key={item.id}
                  className="bg-amber-50 rounded-xl h-40 p-6 shadow-md hover:transform hover:scale-105 items-center justify-center flex"
                >
                  <div className="text-xl font-bold text-gray-600">
                    {item.name}
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;
