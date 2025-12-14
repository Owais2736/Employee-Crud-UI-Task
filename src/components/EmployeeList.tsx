"use client";

import { Employee } from "@/types/employee";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import profileImage from "../../assests/profile.png";

const EmployeeList = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  useEffect(() => {
    const stored = localStorage.getItem("employee");
    setEmployees(stored ? JSON.parse(stored) : []);
  }, []);
  return (
    <>
      <div className="mt-12 mb-6 px-4">
        {employees.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="text-6xl mb-4">
              <Image
                width={60}
                height={60}
                src={profileImage}
                alt="profile image"
              />
            </div>
            <h2 className="text-xl font-semibold text-gray-700">
              No Employee Record
            </h2>
            <p className="text-gray-500 mt-2 text-sm">
              Not any employee add this time. If you try to add go to employee
              page with sidebar navigation employee button.
            </p>
          </div>
        ) : (
          <div className="grid xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6">
            {employees.map((emp) => (
              <div
                key={emp.id}
                className="bg-gray-100 shadow-sm hover:shadow-md p-6 rounded-xl transform transition duration-300 relative overflow-hidden"
              >
                <div className="flex justify-between items-center mb-4">
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      emp.status
                        ? "bg-green-200 text-green-800"
                        : "bg-red-200 text-red-800"
                    }`}
                  >
                    {emp.status ? "Active" : "Inactive"}
                  </span>
                  <span className="text-sm text-gray-600">{emp.role}</span>
                </div>

                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {emp.name}
                  </h3>
                  <p className="text-gray-500 mt-1">{emp.email}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default EmployeeList;
