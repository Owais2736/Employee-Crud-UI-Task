"use client";

import { Modal, Form, Input, Select, Switch, Row, Col, Typography } from "antd";
import { useEffect } from "react";
import { UserOutlined, MailOutlined, IdcardOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

interface EmployeeFormModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: any, id?: string) => void;
  initialValues?: any | null;
}

export default function EmployeeFormModal({
  open,
  onClose,
  onSubmit,
  initialValues,
}: EmployeeFormModalProps) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    } else {
      form.resetFields();
    }
  }, [initialValues, open, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      onSubmit(values, initialValues?.id);
      onClose();
    } catch (err) {
      console.log("====================================");
      console.log("error in ok ");
      console.log("====================================");
    }
  };

  return (
    <Modal
      open={open}
      width={520}
      centered
      destroyOnClose
      onCancel={onClose}
      onOk={handleOk}
      okText={initialValues ? "Update Employee" : "Create Employee"}
      cancelText="Cancel"
      title={
        <div>
          <Title level={4} style={{ marginBottom: 0 }}>
            {initialValues ? "Edit Employee" : "Add New Employee"}
          </Title>
          <Text type="secondary">Fill in employee details below</Text>
        </div>
      }
    >
      <Form form={form} layout="vertical" autoComplete="off">
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="name"
              label="Full Name"
              rules={[{ required: true, message: "Employee name is required" }]}
            >
              <Input
                size="large"
                prefix={<UserOutlined />}
                placeholder="Full Name"
              />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              name="email"
              label="Email Address"
              rules={[
                { required: true, message: "Email is required" },
                { type: "email", message: "Enter a valid email" },
              ]}
            >
              <Input
                size="large"
                prefix={<MailOutlined />}
                placeholder="Enter Email"
              />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              name="role"
              label="Role"
              rules={[{ required: true, message: "Please select a role" }]}
            >
              <Select size="large" placeholder="Select role">
                <Select.Option value="Developer">Developer</Select.Option>
                <Select.Option value="Lead">Lead</Select.Option>
                <Select.Option value="Designer">Designer</Select.Option>
              </Select>
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              name="status"
              label="Employee Status"
              valuePropName="checked"
            >
              <Switch checkedChildren="Active" unCheckedChildren="Inactive" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}
