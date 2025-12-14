"use client";
import Image from "next/image";
import "./globals.css";
import profileImage from "../assests/profile.png";
import Link from "next/link";
import EmployeeList from "@/src/components/EmployeeList";
import { useState } from "react";

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="relative bg-white min-h-screen">
      <div className="lg:hidden flex items-center justify-between bg-[#081028] px-4 py-3">
        <p className="text-gray-300 font-semibold">Employee Dashboard</p>

        <button onClick={() => setSidebarOpen(true)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 text-gray-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 z-[90] lg:hidden"
        />
      )}

      <div className="flex">
        <nav
          className={`
            fixed lg:static top-0 left-0
            h-screen w-[270px]
            bg-[#081028]
            z-[100]
            transition-transform duration-500
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
            lg:translate-x-0
          `}
        >
          <div className="flex items-center px-4 py-4 border-b border-gray-700">
            <p className="text-gray-300 font-semibold">Employee Dashboard</p>

            <button
              onClick={() => setSidebarOpen(false)}
              className="ml-auto lg:hidden text-gray-300"
            >
              ✕
            </button>
          </div>

          <div className="px-4 py-4 overflow-y-auto h-[calc(100vh-70px)]">
            <ul className="space-y-2">
              {[
                { name: "Employees", href: "/employees" },
                { name: "Dashboard", href: "/" },
                { name: "Posts", href: "#" },
                { name: "Schedules", href: "#" },
                { name: "Settings", href: "#" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className="flex items-center px-3 py-2.5 rounded-md text-gray-300 hover:bg-[#0b1739]"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-[18px] h-[18px] mr-3"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <circle cx="12" cy="12" r="10" />
                    </svg>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex items-center gap-3 border-t border-gray-700 pt-4">
              <Image
                src={profileImage}
                alt="profile"
                className="w-9 h-9 rounded-full border border-gray-600"
              />
              <div>
                <p className="text-sm text-gray-300">Owais Ali</p>
                <p className="text-xs text-gray-400">Active free account</p>
              </div>
            </div>
          </div>
        </nav>

        <section className="flex-1 p-6 ">
          <div className="flex items-center flex-wrap gap-6">
            <div>
              <h3 className="text-lg font-semibold text-black">
                Welcome back, Owais Ali
              </h3>
              <p className="text-xs text-black">
                Employee CRUD UI Dashboard using Next.js, TypeScript, AntD &
                Tailwind
              </p>
            </div>

            <div className="ml-auto flex  gap-4">
              <button className="px-4 py-2.5 text-sm text-white bg-[#0b1739] rounded-lg">
                Export data
              </button>
              <button className="px-4 py-2.5 text-sm text-white bg-[#017bfe] rounded-lg">
                Create report
              </button>
            </div>
          </div>

          <EmployeeList />
        </section>
      </div>
    </div>
  );
}
