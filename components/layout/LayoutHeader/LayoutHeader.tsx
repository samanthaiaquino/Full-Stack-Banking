import React from 'react';
import {
 Button, Col, Image, Row,
} from 'antd';
import { useRouter } from 'next/router';
import Link from 'next/link';
import useWindowSize from '../../../hooks/windowDimensions';

const array = [
  { id: 1, name: 'Deposit', route: '/deposit' },
  { id: 2, name: 'Withdraw', route: '/withdraw' },
  { id: 3, name: 'Statement', route: '/statement' },
];

function LayoutHeader({ toggleSidebar, toggleSidebarDesktop }:any) {
  const router = useRouter();
  const { pathname } = router;
  const { width } = useWindowSize();

  const userData = JSON.parse(localStorage.getItem('oqt') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('finance-management-app');
    router?.push('/login');
  };

  return (
    <div className="flex justify-start items-center w-full fixed top-0 left-0 right-0">
      <div className="flex items-center w-full max-w-[1580px] h-[100px] bg-[#F7F8FA] px-4">
        <Row className="w-full flex items-center" gutter={[8, 8]}>
          <Col xxl={4} xl={4} lg={4} md={4} sm={12} xs={12}>
            <div className="flex items-center justify-start w-full gap-x-[10px]">
              <Image
                alt=""
                src="/assets/images/collapse_btn.png"
                preview={false}
                height={40}
                width={40}
                className="cursor-pointer"
                onClick={width >= 992 ? toggleSidebarDesktop : toggleSidebar}
              />
            </div>
          </Col>
          <Col xxl={15} xl={17} lg={15} md={15} sm={0} xs={0} className="flex justify-center items-center w-full tablet:hidden">
            <div className={`flex w-full max-w-[450px] justify-${userData?.User?.role !== 'AGENT' ? 'between' : 'center'} items-center font-bold text-[13px] !text-text_color cursor-pointer`}>
              {array.map((val) => (userData?.User?.role !== 'AGENT' || !['Users', 'Summary', 'Dashboard'].includes(val.name)) && (
                <Link key={val.id} href={val.route === '/view-profile' ? { pathname: val.route, query: { userId: userData?.User.id, userRole: userData?.User.role } } : val.route}>
                  <div className={pathname === val.route ? '!text-[#8833FF] font-bold text-[15px]' : '!text-text_color hover:!text-text_color font-bold text-[15px]'}>
                    {val.name}
                  </div>
                </Link>
              ))}
            </div>
          </Col>
          <Col xxl={3} xl={3} lg={3} md={5} sm={12} xs={12} className="flex justify-end items-center w-full">
            <div className="flex items-center justify-between max-w-[190px] w-full mobile:justify-end">
              <Button onClick={handleLogout}>Logout</Button>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default LayoutHeader;
