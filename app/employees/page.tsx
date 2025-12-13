"use client";

import { useState, useMemo } from "react";
import useEmployees from "./hooks/useEmployees";
import EmployeeTable from "./components/EmployeeTable";
import EmployeeFormModal from "./components/EmployeeFormModal";

import { Button, Col, Input, Row, Card, Typography } from "antd";

import { PlusOutlined, SearchOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

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
    <div style={{ padding: 24 }}>
      <Row justify="space-between" align="middle" style={{ marginBottom: 20 }}>
        <Col>
          <Title level={3} style={{ margin: 0 }}>
            Employees
          </Title>
          <Text type="secondary">Manage employees, roles and status</Text>
        </Col>

        <Col>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            size="large"
            onClick={openAddModal}
            style={{ marginTop: "10px" }}
          >
            Add Employee
          </Button>
        </Col>
      </Row>

      <Card
        bordered={false}
        style={{
          borderRadius: 12,
          boxShadow: "0 6px 16px rgba(0,0,0,0.06)",
        }}
      >
        <Row justify={"end"} style={{ marginBottom: 16 }}>
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

        <div style={{ overflowX: "auto" }}>
          <EmployeeTable
            employees={filteredEmployees}
            onEdit={openEditModal}
            onDelete={deleteEmployee}
          />
        </div>
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
