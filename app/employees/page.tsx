'use client';

import { useState, useMemo } from 'react';
import useEmployees from './hooks/useEmployees';
import EmployeeTable from './components/EmployeeTable';
import EmployeeFormModal from './components/EmployeeFormModal';
import { Button, Input, Row } from 'antd';

export default function EmployeesPage() {
  const { employees, addEmployee, updateEmployee, deleteEmployee } = useEmployees();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<any | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter employees based on search input
  const filteredEmployees = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return employees.filter(
      emp =>
        emp.name.toLowerCase().includes(q) ||
        emp.email.toLowerCase().includes(q)
    );
  }, [employees, searchQuery]);

  // Handle Add or Update
  const handleSubmit = (data: any, id?: string) => {
    if (id) {
      updateEmployee(id, data);
    } else {
      addEmployee(data);
    }
  };

  // Open modal for Add
  const openAddModal = () => {
    setEditingEmployee(null);
    setModalOpen(true);
  };

  // Open modal for Edit
  const openEditModal = (employee: any) => {
    setEditingEmployee(employee);
    setModalOpen(true);
  };

  return (
    <div>
      <Row justify="space-between" style={{ marginBottom: 16 }}>
        <h1>Employees</h1>
        <Button type="primary" onClick={openAddModal}>
          Add Employee
        </Button>
      </Row>

      <Input.Search
        placeholder="Search by name or email"
        style={{ marginBottom: 16 }}
        allowClear
        onChange={e => setSearchQuery(e.target.value)}
      />

      <EmployeeTable
        employees={filteredEmployees}
        onEdit={openEditModal}
        onDelete={deleteEmployee}
      />

      <EmployeeFormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        initialValues={editingEmployee}
      />
    </div>
  );
}
