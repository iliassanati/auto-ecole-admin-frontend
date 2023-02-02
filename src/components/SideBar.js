import React, { useState } from 'react';
import {
  ProSidebar,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from 'react-pro-sidebar';
import { FiArrowLeftCircle, FiArrowRightCircle } from 'react-icons/fi';
import { Image } from 'react-bootstrap';

const SideBar = ({ children }) => {
  const [menuCollapse, setMenuCollapse] = useState(false);
  const menuIconClick = () => {
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  };

  return (
    <>
      <ProSidebar
        collapsed={menuCollapse}
        breakPoint='md'
        style={{ height: '100vh', backgroundColor: '#21333e' }}
        // image='/assets/images/background.jpg'
      >
        <SidebarHeader>
          <div className='logotext  mt-4  text-center'>
            <h5 style={{ color: 'wheat' }}>
              {menuCollapse ? (
                <Image
                  src='/logo-red.png'
                  style={{ width: '40px', height: '40px' }}
                ></Image>
              ) : (
                '  AUTO ECOLE TAJ EL IDRISSI'
              )}
            </h5>
          </div>
          <div className='closemenu' onClick={menuIconClick}>
            {menuCollapse ? <FiArrowRightCircle /> : <FiArrowLeftCircle />}
          </div>
        </SidebarHeader>
        <SidebarContent>{children}</SidebarContent>
        <SidebarFooter>
          <p style={{ textAlign: 'center' }}>Taj EL Idrissi</p>
        </SidebarFooter>
      </ProSidebar>
    </>
  );
};

export default SideBar;
