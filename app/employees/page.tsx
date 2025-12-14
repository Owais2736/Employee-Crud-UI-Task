"use client";
import { useState, useMemo } from "react";
import useEmployees from "./hooks/useEmployees";
import EmployeeTable from "./components/EmployeeTable";
import EmployeeFormModal from "./components/EmployeeFormModal";
import "../globals.css";

import { Button, Col, Input, Row, Card, Typography } from "antd";
import {
  DashboardOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import Link from "next/link";

const { Title, Text } = Typography;

// mobile card
const EmployeeMobileList = ({ employees, onEdit, onDelete }: any) => {
  if (!employees.length) {
    return (
      <p className="text-center text-gray-500 py-8">
        No employee records found
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {employees.map((emp: any) => (
        <div
          key={emp.id}
          className="rounded-lg border border-gray-200 bg-white p-3 shadow-sm hover:shadow-md transition-shadow duration-300"
        >
          <div className="mb-3">
            <p className="font-medium text-gray-900 text-base">{emp.name}</p>
            <p className="text-gray-500 text-sm">{emp.email}</p>
            <span className="inline-block mt-1 px-2 py-0.5 text-[10px] font-medium rounded-full bg-blue-100 text-blue-800">
              {emp.role}
            </span>
          </div>

          <div className="flex gap-2 justify-end">
            <Button
              type="primary"
              size="small"
              onClick={() => onEdit(emp)}
              className="flex-1 py-1 text-sm"
            >
              Edit
            </Button>
            <Button
              type="primary"
              danger
              size="small"
              onClick={() => onDelete(emp.id)}
              className="flex-1 py-1 text-sm"
            >
              Delete
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

// desktop table
export default function EmployeesPage() {
  const { employees, addEmployee, updateEmployee, deleteEmployee } =
    useEmployees();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<any | null>(null);
  const [search, setSearch] = useState("");

  const filteredEmployees = useMemo(() => {
    const searchInput = search.toLowerCase();
    return employees.filter(
      (emp) =>
        emp.name.toLowerCase().includes(searchInput) ||
        emp.email.toLowerCase().includes(searchInput)
    );
  }, [employees, search]);

  const handleSubmit = (data: any, id?: string) => {
    if (id) updateEmployee(id, data);
    else addEmployee(data);
  };

  const openAddModal = () => {
    setEditingEmployee(null);
    setModalOpen(true);
  };

  const openEditModal = (employee: any) => {
    setEditingEmployee(employee);
    setModalOpen(true);
  };

  return (
    <div className="p-4 lg:p-12">
      <Row justify="space-between" align="middle" style={{ marginBottom: 20 }}>
        <Col>
          <Title level={3} style={{ margin: 0 }}>
            Employees
          </Title>
          <Text type="secondary">Manage employees, roles and status</Text>
        </Col>

        <Col>
          <Link href="/">
            <Button
              type="primary"
              icon={<DashboardOutlined />}
              size="large"
              style={{
                marginTop: 10,
                backgroundColor: "#0f172a",
                borderColor: "#0f172a",
              }}
            >
              Dashboard
            </Button>
          </Link>

          <Button
            type="primary"
            icon={<PlusOutlined />}
            size="large"
            onClick={openAddModal}
            style={{ marginTop: 10, marginLeft: 10 }}
          >
            Add Employee
          </Button>
        </Col>
      </Row>

      <Card
        variant="borderless"
        style={{
          borderRadius: 12,
          boxShadow: "0 6px 16px rgba(0,0,0,0.06)",
        }}
      >
        <Row justify="end" style={{ marginBottom: 16 }}>
          <Col xs={24} md={12} lg={6}>
            <Input
              placeholder="Search by Name or Email"
              prefix={<SearchOutlined />}
              allowClear
              size="large"
              onChange={(e) => setSearch(e.target.value)}
            />
          </Col>
        </Row>

        <Row>
          <Col xs={24} md={0}>
            <EmployeeMobileList
              employees={filteredEmployees}
              onEdit={openEditModal}
              onDelete={deleteEmployee}
            />
          </Col>

          <Col xs={0} md={24}>
            <EmployeeTable
              employees={filteredEmployees}
              onEdit={openEditModal}
              onDelete={deleteEmployee}
            />
          </Col>
        </Row>
      </Card>

      <EmployeeFormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        initialValues={editingEmployee}
      />
    </div>
  );
}
