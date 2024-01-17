/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';
import {
 Card, Divider, Spin, Table, Tag,
} from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useQuery } from 'react-query';
import dayjs from 'dayjs';
import Layout from '../../components/layout/Layout';
import { getFinance, getTotal } from '../../services/finance';

interface DataType {
  key: string;
  financeType: string;
  purpose: string;
  date: string;
  amount: number;
}
function Statement() {
const [skip, setSkip] = useState<number>(0);

const columns: ColumnsType<DataType> = [
  {
    title: 'Type',
    dataIndex: 'financeType',
    key: 'type',
    render: (_, { financeType }:any) => (
      <Tag color={financeType === "CREDIT" ? "green" : "red"} key={financeType}>
        {financeType?.toUpperCase()}
      </Tag>
    ),
  },
  {
    title: 'Purpose of transaction',
    dataIndex: 'purpose',
    key: 'purpose',
    render: (_, { purpose }: any) => (
      <div>
        {purpose || "none"}
      </div>
),
  },
  {
    title: 'Date of transaction',
    dataIndex: 'date',
    key: 'date',
    render: (_, { date }: any) => <>{dayjs(date).format("YYYY-MM-DD")}</>,
  },
  {
    title: 'Amount',
    key: 'amount',
    dataIndex: 'amount',

  },

];

  const take = 10;

  const authData: any = localStorage.getItem('finance-management-app');
  const parsedData: any = JSON.parse(authData);

  const { data, isLoading } = useQuery(["get-finance", skip, parsedData?.user?.id], () => getFinance({ skip, take }));

  const { data: totalFinance, isLoading: totalFinanceLoading } = useQuery(["total-finance", parsedData?.user?.id], () => getTotal({}), {
    select: (value: any) => ({
      credit: value?.data?.find((d:any) => d?.financeType === "CREDIT")?._sum?.amount,
      debit: value?.data?.find((d: any) => d?.financeType === "DEBIT")?._sum?.amount,
      total: value?.data?.find((d:any) => d?.financeType === "CREDIT")?._sum?.amount - value?.data?.find((d: any) => d?.financeType === "DEBIT")?._sum?.amount,
    }),
  });

    return (
      <Layout>

        <Spin spinning={totalFinanceLoading}>
          <div className="w-full flex justify-between flex-wrap">
            <h2 className="mt-6 text-[#4e4d4d]">Financial Statement</h2>
            <Card className="w-[300px] p-2 font-bold">
              <div className="w-full flex justify-between">
                <div>Total Credit</div>
                <div>
                  { totalFinance?.credit ? `+${totalFinance?.credit}` : "-"}
                </div>
              </div>
              <br />
              <div className="w-full flex justify-between">
                <div>Total Debit</div>
                <div>
                  { totalFinance?.debit ? `-${totalFinance?.debit}` : "-"}
                </div>
              </div>
              <Divider />
              <div className="w-full flex justify-between">
                <div>Total Balance</div>
                <div>{ totalFinance?.total}</div>
              </div>

            </Card>
          </div>
        </Spin>
        <Table
          loading={isLoading}
          className="mt-6"
          columns={columns}
          dataSource={data?.data}
          pagination={{
            total: data?.count,
            defaultPageSize: take,
            onChange: (page: number, pageSize) => {
              setSkip((page * pageSize) - take);
          // console.log(page, pageSize);
        },
}}
        />
      </Layout>
    );
}

export default Statement;
