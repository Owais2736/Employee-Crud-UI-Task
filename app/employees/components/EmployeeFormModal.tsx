'use client';

import { Modal, Form, Input, Select, Switch } from 'antd';
import { useEffect } from 'react';

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

  // Set form values if editing, reset if adding
  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    } else {
      form.resetFields();
    }
  }, [initialValues, open, form]);

  // Handle submit
  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        onSubmit(values, initialValues?.id);
        onClose();
      })
      .catch(info => {
        console.log('Validation failed:', info);
      });
  };

  return (
    <Modal
      title={initialValues ? 'Edit Employee' : 'Add Employee'}
      open={open}
      onOk={handleOk}
      onCancel={onClose}
      okText={initialValues ? 'Update' : 'Create'}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: 'Please enter employee name' }]}
        >
          <Input placeholder="John Doe" />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: 'Please enter email' },
            { type: 'email', message: 'Enter a valid email' },
          ]}
        >
          <Input placeholder="email@example.com" />
        </Form.Item>

        <Form.Item
          name="role"
          label="Role"
          rules={[{ required: true, message: 'Please select role' }]}
        >
          <Select placeholder="Select role">
            <Select.Option value="Developer">Developer</Select.Option>
            <Select.Option value="Lead">Lead</Select.Option>
            <Select.Option value="Designer">Designer</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item name="status" label="Active" valuePropName="checked">
          <Switch checkedChildren="Active" unCheckedChildren="Inactive" />
        </Form.Item>
      </Form>
    </Modal>
  );
}
