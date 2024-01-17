/* eslint-disable @next/next/no-html-link-for-pages */
import { Col, Image, Row } from 'antd';
import { useRouter } from 'next/router';
import React from 'react';
import Link from 'next/link';

const flexProperties = 'flex items-center justify-center';
interface LayoutSidebarProps {
  desktopToggle?: boolean;
  toggle?: boolean;
  // data: LayoutInterface;
}

function LayoutSidebar({ desktopToggle, toggle }: LayoutSidebarProps) {
  const router = useRouter();
  const { pathname }: { pathname: string } = router;

  const getData: any = localStorage.getItem('finance-management-app');
  const userDataRole = JSON.parse(getData);

  return (
    <Row
      className={
        toggle
          ? `${flexProperties} bg-[#FFF]`
          : `${flexProperties} bg-[#F7F8FA]`
      }
    >
      <Col
        className="flex justify-end"
        xs={24}
        sm={24}
        md={24}
        lg={24}
        xl={24}
        xxl={24}
      >
        <div
          className={
            toggle
              ? 'w-full h-full text-[18px] pb-4 rounded-[20px] !text-[#263437] mx-0 mt-6 border-2 border-solid border-[#EDEFF2]'
              : 'h-full text-[18px] pb-4 rounded-[20px] !text-[#263437] mx-1 w-[310px] mt-6 border-2 border-solid border-[#EDEFF2]'
          }
        >
          <div>
            <div className="flex flex-col justify-center items-center mt-8">
              <div>
                <div className="fixed-column p-2 flex justify-center items-center w-full object-cover rounded-full border-2 border-[#DADEE6]  border-solid  ">
                  <div className="rounded-full w-[130px] h-[130px]    bg-[#a968ee] !text-[#fff] marker:h-[50px] text-[24px] font-semibold flex justify-center items-center cursor-pointer">
                    { "user".slice(0, 1).toUpperCase()}
                  </div>
                </div>
              </div>

            </div>
            <div className=" flex justify-center items-center w-full flex-col gap-y-[10px] px-2 pt-4">
              {userDataRole?.User?.role !== 'AGENT' && (
                <Link href="/deposit">
                  <a
                    href="/deposit"
                    className={
                      pathname === '/deposit'
                        ? 'w-full h-full rounded-[10px] p-[15px]  bg-[#8833FF]  !text-[#fff]  hover:!text-[#fff] sidebar_btn'
                        : 'w-full h-full rounded-[10px] p-[15px] border-hidden cursor-pointer   bg-[#F7F8FA]   !text-[#6B7A99] hover:!text-[#6B7A99] sidebar_btn'
                    }
                  >
                    <div
                      className={
                        !desktopToggle
                          ? 'flex items-center'
                          : 'flex items-center justify-center'
                      }
                    >
                      <Image
                        alt=""
                        src="/assets/icons/dashboard.svg"
                        preview={false}
                        height={30}
                        width={30}
                      />
                      {!desktopToggle ? (
                        <span className=" font-bold text-[12px] ml-3">
                          Deposit
                        </span>
                      ) : (
                        ''
                      )}
                    </div>
                  </a>
                </Link>
              )}

              <Link href="/withdraw">
                <a
                  href="/withdraw"
                  className={
                      pathname === '/withdraw'
                        ? 'w-full h-full rounded-[10px] p-[15px]  bg-[#8833FF]   !text-[#fff] hover:!text-[#fff] sidebar_btn'
                        : 'w-full h-full rounded-[10px] p-[15px] cursor-pointer bg-[#F7F8FA]  border-hidden !text-[#6B7A99] hover:!text-[#6B7A99] sidebar_btn'
                    }
                >
                  <div
                    className={
                        !desktopToggle
                          ? 'flex items-center'
                          : 'flex items-center justify-center'
                      }
                  >
                    <Image
                      alt=""
                      src="/assets/icons/table_chart.svg"
                      preview={false}
                      height={30}
                      width={30}
                    />
                    {!desktopToggle ? (
                      <span className=" font-bold text-[12px] ml-3">
                        Withdraw
                      </span>
                      ) : (
                        ''
                      )}
                  </div>
                </a>
              </Link>

              <Link href="/statement">
                <a
                  href="/statement"
                  className={
                      pathname === '/analyics'
                        ? 'w-full h-full rounded-[10px] p-[15px] bg-[#8833FF]  hover:!text-[#fff] !text-[#fff] sidebar_btn'
                        : 'w-full h-full rounded-[10px] p-[15px] cursor-pointer  border-hidden bg-[#F7F8FA] !text-[#6B7A99] hover:!text-[#6B7A99] sidebar_btn'
                    }
                >
                  <div
                    className={
                        !desktopToggle
                          ? 'flex items-center'
                          : 'flex items-center justify-center'
                      }
                  >
                    <Image
                      alt=""
                      src="/assets/icons/chart.svg"
                      preview={false}
                      height={30}
                      width={30}
                    />
                    {!desktopToggle ? (
                      <span className=" font-bold text-[12px] ml-3">
                        Statement
                      </span>
                      ) : (
                        ''
                      )}
                  </div>
                </a>
              </Link>

            </div>
          </div>
        </div>
      </Col>
    </Row>
  );
}

LayoutSidebar.defaultProps = {
  desktopToggle: false,
  toggle: false,
};

export default LayoutSidebar;
