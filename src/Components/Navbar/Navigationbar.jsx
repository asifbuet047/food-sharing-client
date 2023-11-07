import React, { useContext } from 'react'
import { Navbar } from 'flowbite-react'
import { AuthenticationContext } from '../../Contexts/AuthenticationContextProvider'
import SignedinButton from '../Miscellaneous/SignedinButton';
import { FaPeopleRoof } from 'react-icons/fa6'

function Navigationbar() {
  const { userLoading } = useContext(AuthenticationContext);
  return (
    <div>
      <Navbar fluid rounded>
        <Navbar.Brand href="/">
          <FaPeopleRoof size={'3em'}></FaPeopleRoof>
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Community Food Sharing</span>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Navbar.Link href='/' active>Home</Navbar.Link>
          <Navbar.Link href='/availablefoods'>Available Foods</Navbar.Link>
          <Navbar.Link href='/addfood'>Add Food</Navbar.Link>
          <Navbar.Link href='/managefood'>Manage My Foods</Navbar.Link>
          <Navbar.Link href='/requestfood'>My Food Request</Navbar.Link>
          <SignedinButton></SignedinButton>
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}

export default Navigationbar