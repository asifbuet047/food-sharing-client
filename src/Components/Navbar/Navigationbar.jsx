import React, { useContext } from 'react'
import { Navbar } from 'flowbite-react'
import { AuthenticationContext } from '../../Contexts/AuthenticationContextProvider'
import SignedinButton from '../Miscellaneous/SignedinButton';
import { FaPeopleRoof } from 'react-icons/fa6'
import { getProjectName } from '../../Utilities/Utilities';
import { Avatar } from 'flowbite-react';
import { Dropdown } from 'flowbite-react';

function Navigationbar() {
  const { userLoading, user } = useContext(AuthenticationContext);
  return (
    <Navbar fluid rounded>
      <Navbar.Brand href="/">
        <FaPeopleRoof size={'3em'}></FaPeopleRoof>
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Community Foods</span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar alt="User settings" img={user?.photoURL} rounded />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">{user?.user?.email}</span>
            <span className="block truncate text-sm font-medium">{user?.user?.email}</span>
          </Dropdown.Header>
          <Dropdown.Item>Dashboard</Dropdown.Item>
          <Dropdown.Item>Settings</Dropdown.Item>
          <Dropdown.Divider />
          <SignedinButton></SignedinButton>
        </Dropdown>
      </div>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Navbar.Link href="/">Home</Navbar.Link>
        <Navbar.Link href="/availablefoods">Available Foods</Navbar.Link>
        <Navbar.Link href="#">Add Food</Navbar.Link>
        <Navbar.Link href="#">Manage My Foods</Navbar.Link>
        <Navbar.Link href="#">Join Us</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Navigationbar