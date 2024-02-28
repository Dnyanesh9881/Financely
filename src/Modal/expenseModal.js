import { Button, DatePicker, Form, Input, Modal, Select } from "antd";
import React from "react";

function ExpenseModal({
  isExpenseModelVisible,
  handelExpenseCancel,
  onFinish,
}) {
  const [form] = Form.useForm();
  return (
    <div>
      <Modal
        style={{ fontWeight: 600 , fontSize:80}}
        title="Add Expense"
        visible={isExpenseModelVisible}
        onCancel={handelExpenseCancel}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={(values) => {
            onFinish(values, "Expense");
            form.resetFields();
          }}
        >
          <Form.Item
            style={{ fontWeight: 600 }}
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "please Input the name of the transaction",
              },
            ]}
          >
            <Input type="text" className="custom-input" />
          </Form.Item>
          <Form.Item
            style={{ fontWeight: 600 }}
            label="Amount"
            name="amount"
            rules={[
              {
                required: true,
                message: "please Input the expense amount",
              },
            ]}
          >
            <Input type="number" className="custom-input" />
          </Form.Item>
          <Form.Item
            style={{ fontWeight: 600 }}
            label="Date"
            name="date"
            rules={[
              {
                required: true,
                message: "please select expense date",
              },
            ]}
          >
            <DatePicker format="YYYY-MM-DD" className="custom-input" />
          </Form.Item>
          <Form.Item
            style={{ fontWeight: 600 }}
            label="Tag"
            name="tag"
            rules={[
              {
                required: true,
                message: "please select the tag!",
              },
            ]}
          >
            <Select className="select-input">
              <Select.Option value="food">food</Select.Option>
              <Select.Option value="education">Education</Select.Option>
              <Select.Option value="office">office</Select.Option>
            </Select>
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Add Expense
          </Button>
        </Form>
      </Modal>
    </div>
  );
}

export default ExpenseModal;
