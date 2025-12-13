"use client";
import { useEffect, useState } from "react";
import { Employee } from "../../../types/employee";
import { v4 as uuidv4 } from "uuid";

const localStorageEmployeeObject = "employee";

export default function useEmployees() {
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(localStorageEmployeeObject);
      if (raw) {
        setEmployees(JSON.parse(raw) as Employee[]);
        return;
      }
    } catch (e) {
      console.error("Failed to read from localStorage", e);
    }

    // sampleData sample data if empty
    const sampleData: Employee[] = [
      {
        id: uuidv4(),
        name: "Faraz Khan",
        email: "faraz@gmail.com",
        role: "Developer",
        status: true,
      },
      {
        id: uuidv4(),
        name: "Bilal Ahmed",
        email: "bilal@gmail.com",
        role: "Lead",
        status: true,
      },
      {
        id: uuidv4(),
        name: "Sara Ali",
        email: "sara@gmail.com",
        role: "Designer",
        status: false,
      },
      {
        id: uuidv4(),
        name: "Sara Ali",
        email: "sara@gmail.com",
        role: "Designer",
        status: false,
      },

      {
        id: uuidv4(),
        name: "Sara Ali",
        email: "sara@gmail.com",
        role: "Designer",
        status: false,
      },
      {
        id: uuidv4(),
        name: "Sara Ali",
        email: "sara@gmail.com",
        role: "Designer",
        status: false,
      },
      {
        id: uuidv4(),
        name: "Sara Ali",
        email: "sara@gmail.com",
        role: "Designer",
        status: false,
      },
      {
        id: uuidv4(),
        name: "Sara Ali",
        email: "sara@gmail.com",
        role: "Designer",
        status: false,
      },
      {
        id: uuidv4(),
        name: "Sara Ali",
        email: "sara@gmail.com",
        role: "Designer",
        status: false,
      },
      {
        id: uuidv4(),
        name: "Sara Ali",
        email: "sara@gmail.com",
        role: "Designer",
        status: false,
      },
    ];
    setEmployees(sampleData);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(
        localStorageEmployeeObject,
        JSON.stringify(employees)
      );
    } catch (e) {
      console.error("Failed to write employees to localStorage", e);
    }
  }, [employees]);

  function addEmployee(payload: Omit<Employee, "id">) {
    const newEmp: Employee = { id: uuidv4(), ...payload };
    setEmployees((prev) => [newEmp, ...prev]);
  }

  function updateEmployee(id: string, payload: Omit<Employee, "id">) {
    setEmployees((prev) =>
      prev.map((e) => (e.id === id ? { id, ...payload } : e))
    );
  }

  function deleteEmployee(id: string) {
    setEmployees((prev) => prev.filter((item) => item.id !== id));
  }

  return {
    employees,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    setEmployees,
  };
}
