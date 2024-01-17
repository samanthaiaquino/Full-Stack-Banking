import React, { ReactNode, useState } from 'react';
import { Drawer, Image } from 'antd';
import useWindowSize from '../../hooks/windowDimensions';
import LayoutSidebar from './LayoutSidebar/LayoutSidebar';
import LayoutHeader from './LayoutHeader/LayoutHeader';

function Layout({ children }: { children: ReactNode }) {
    const { width } = useWindowSize();
    const [toggle, setToggle] = useState<boolean>(false);
    const [desktopToggle, setDesktopToggle] = useState<boolean>(false);

    let collapseWidth;

    if (width <= 992) {
      if (width >= 768) {
        collapseWidth = '45%';
      } else {
        collapseWidth = '100%';
      }
    } else if (width <= 768 && width >= 575) {
      collapseWidth = '70%';
    } else {
      collapseWidth = '100%';
    }

    const onClose = () => {
      setToggle(false);
    };

    // const { data } = useQuery(['getMe'], () => getUserMe());

    const toggleSidebar = () => {
      setToggle((prevState) => !prevState);
    };

    const toggleSidebarDesktop = () => {
      setDesktopToggle((prevState) => !prevState);
    };

    return (
      <div className="flex justify-start items-center w-full bg-[#F7F8FA]   ">
        <div className="flex flex-row h-screen w-full  max-w-[1580px]  ">
          {width >= 992 && (
          <div
            className="overflow-auto bg-[#F7F8FA] mt-[90px] mb-4 transition-all duration-300 ease-in-out"
            style={desktopToggle ? { width: '100px' } : { width: '330px' }}
          >
            <LayoutSidebar desktopToggle={desktopToggle} />
          </div>
          )}
          <div
            className={
              !desktopToggle
                ? 'flex flex-col flex-1  '
                : 'flex flex-col flex-1  backdrop:ease-in-out duration-400'
            }
            style={{
              width: !desktopToggle ? 'calc(100% - 370px)' : 'calc(100% - 100px)',
              transition: 'width 0.4s ease',
            }}
          >
            <LayoutHeader
              toggleSidebar={toggleSidebar}
              toggleSidebarDesktop={toggleSidebarDesktop}
            />
            <div className="flex-1 overflow-y-auto bg-[#F7F8FA] mt-[100px] p-2">
              {children}
            </div>
          </div>
          <Drawer
            title={(
              <div className="text-[18px] font-bold !text-[#4D5E80]">
                {/* {data?.role === 'MAIN_SCHEDULER' ? 'MAIN SCHEDULER' : data?.role} */}
              </div>
            )}
            placement="left"
            onClose={onClose}
            open={toggle}
            width={collapseWidth}
            headerStyle={{ borderBottom: 'none' }}
            closeIcon={(
              <Image
                alt=""
                height={50}
                width={50}
                preview={false}
                src="/assets/icons/drawer_close.png"
              />
            )}
          >
            <LayoutSidebar toggle={toggle} />
          </Drawer>
        </div>
      </div>
    );
  }

export default Layout;
