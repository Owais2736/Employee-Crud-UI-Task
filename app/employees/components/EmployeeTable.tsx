"use client";

import { Table, Button, Popconfirm, Tag, Space } from "antd";
import { Employee } from "@/types/employee";

interface Props {
  employees: Employee[];
  onEdit: (employee: Employee) => void;
  onDelete: (id: string) => void;
}

export default function EmployeeTable({ employees, onEdit, onDelete }: Props) {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      sorter: (a: Employee, b: Employee) => a.name.localeCompare(b.name),
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (isActive: boolean) =>
        isActive ? (
          <Tag color="green">Active</Tag>
        ) : (
          <Tag color="red">InActive</Tag>
        ),
    },
    {
      title: "Actions",
      render: (_: any, record: Employee) => (
        <Space>
          <Button type="primary" onClick={() => onEdit(record)}>
            Edit
          </Button>

          <Popconfirm
            title="Are you sure you want to delete this employee?"
            onConfirm={() => onDelete(record.id)}
          >
            <Button danger>Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Table
      rowKey="id"
      dataSource={employees}
      columns={columns}
      locale={{ emptyText: "No employees added yet" }}
      pagination={{ pageSize: 6 }}
    />
  );
}
