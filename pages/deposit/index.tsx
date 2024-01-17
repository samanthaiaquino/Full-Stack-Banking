import React from 'react';
import {
 Button, Card, Form, Input, Spin, message,
} from 'antd';
import { useMutation } from 'react-query';
import Layout from '../../components/layout/Layout';

import { amountDeposit } from '../../services/finance';

function Deposit() {
  const { mutate, isLoading } = useMutation((data: any) => amountDeposit(data), {
    onSuccess: () => {
      message.success("Amount deposit successfully!");
    },
    onError: (err: any) => {
      message.error(err?.response?.data?.message);
    },
  });

  const onFinish = (values: any) => {
     mutate({
      amount: +values.amount,
      financeType: "CREDIT",
      purpose: values.purpose,
      date: new Date(),
    });
  };
    return (
      <Layout>
        <div className="w-full flex justify-center items-center">
          <Card className="max-w-[500px] w-full mt-6 ">
            <Spin
              spinning={isLoading}
              className="flex justify-center items-center w-full h-full"
            >
              <h1 className="text-center py-6">Deposit</h1>
              <Form
                name="basic"
                onFinish={onFinish}
                layout="vertical"
                className="flex justify-center items-center flex-col w-full px-[20px]"
                autoComplete="new-password"
              >
                <Form.Item
                  label="Deposit Amount"
                  name="amount"
                  className="w-full max-w-[310px] custom-label login_input"
                  rules={[
                  { required: true, message: 'Please input your amount!' },
                ]}
                >
                  <Input
                    type="number"
                    className="w-full !text-gray-500   shadow-sm"
                    placeholder="Enter amount"
                  />
                </Form.Item>

                <Form.Item
                  label="Porpose of Transection"
                  name="purpose"
                  className="w-full max-w-[310px] custom-label login_input"

                >
                  <Input
                    type="text"
                    className="w-full !text-gray-500   shadow-sm"
                    placeholder="Enter purpose of transaction"
                  />
                </Form.Item>

                <Form.Item className="w-full form_alignment text-center ">
                  <Button
                    className="bg-purple-600 !text-white max-w-[310px] w-full font-bold hover:!bg-purple-600 hover:!text-white"
                    htmlType="submit"
                    type="text"
                    onSubmit={(e) => e.preventDefault()}
                  >
                    {isLoading ? 'Submiting...' : 'Submit'}
                  </Button>
                </Form.Item>
              </Form>

            </Spin>
          </Card>
        </div>
      </Layout>
    );
}

export default Deposit;
