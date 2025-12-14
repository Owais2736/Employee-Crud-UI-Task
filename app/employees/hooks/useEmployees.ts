"use client";
import { useEffect, useState } from "react";
import { Employee } from "../../../types/employee";
import { v4 as uuidv4 } from "uuid";

const STORAGE_KEY = "employee";

export default function useEmployees() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        setEmployees(JSON.parse(raw));
      }
    } catch (e) {
      console.error("Failed to read from localStorage", e);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(employees));
  }, [employees, isHydrated]);

  function addEmployee(payload: Omit<Employee, "id">) {
    setEmployees((prev) => [{ id: uuidv4(), ...payload }, ...prev]);
  }

  function updateEmployee(id: string, payload: Omit<Employee, "id">) {
    setEmployees((prev) =>
      prev.map((e) => (e.id === id ? { id, ...payload } : e))
    );
  }

  function deleteEmployee(id: string) {
    setEmployees((prev) => prev.filter((e) => e.id !== id));
  }

  return {
    employees,
    addEmployee,
    updateEmployee,
    deleteEmployee,
  };
}
