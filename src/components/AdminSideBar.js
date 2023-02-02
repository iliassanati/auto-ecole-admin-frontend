import React from 'react';
import { Menu, MenuItem } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import SideBar from './SideBar';

const AdminSideBar = ({ identifiant }) => {
  return (
    <>
      <SideBar>
        <Menu iconShape='circle' popperArrow='false'>
          <MenuItem icon={<i className='fas fa-user-alt fa-2x'></i>}>
            <Link to='/admin/dashboard'>{identifiant}</Link>
          </MenuItem>
          <br />
          <br />
          <MenuItem icon={<i className='fas fa-tachometer-alt fa-2x'></i>}>
            <Link to='/admin/dashboard'>Tableau de bord</Link>
          </MenuItem>
          <MenuItem icon={<i className='fas fa-users fa-2x'></i>}>
            <Link to='/admin/utilisateurs'>Utilisateurs</Link>
          </MenuItem>
          <MenuItem icon={<i className='fas fa-info fa-2x'></i>}>
            <Link to='/admin/news'>News</Link>
          </MenuItem>
          <MenuItem icon={<i className='fas fa-chart-line fa-2x'></i>}>
            <Link to='/admin/activites'>Activites</Link>
          </MenuItem>
          <MenuItem icon={<i className='fas fa-screwdriver fa-2x'></i>}>
            <Link to='/admin/services'>Services</Link>
          </MenuItem>
          <MenuItem icon={<i className='fas fa-question fa-2x'></i>}>
            <Link to='/admin/questions'>Q&A</Link>
          </MenuItem>
        </Menu>
      </SideBar>
    </>
  );
};

export default AdminSideBar;
