import React, { useContext } from 'react'
import { Button, Navbar } from 'flowbite-react'
import { AuthenticationContext } from '../../Contexts/AuthenticationContextProvider'
import { FaPeopleRoof } from 'react-icons/fa6'
import { getProjectName } from '../../Utilities/Utilities';
import { Avatar } from 'flowbite-react';
import { Dropdown } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Navigationbar() {
  const { user, signOutUser, userLoading } = useContext(AuthenticationContext);
  const navigate = useNavigate();


  const handleLogin = () => {
    navigate('/signin');
    toast.success(`User Successfully Logged In. Welcome`, {
      position: 'bottom-center',
      autoClose: 2000,
    });
  }

  const handleLogout = () => {
    signOutUser();
    navigate('/signin');
    toast.success(`User Successfully Logged Out. Login to donate`, {
      position: 'bottom-center',
      autoClose: 2000,
    });
  }

  return (
    <Navbar fluid rounded className='w-full'>
      <Navbar.Brand href="/">
        <FaPeopleRoof size={'3em'}></FaPeopleRoof>
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">{getProjectName()}</span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar alt="" img={user?.photoURL} rounded />
          }
        >
          <Dropdown.Header>
            {
              user ?
                <div>
                  {
                    user?.displayName ?
                      <div className='flex flex-col justify-center items-center'>
                        <span className="block truncate text-sm font-medium mb-2 mt-2">{user.displayName}</span>
                        <Button onClick={handleLogout}>Log Out</Button>
                      </div>

                      :
                      <div className='flex flex-col justify-center items-center'>
                        <span className="block text-sm mb-2 mt-2">{user.email}</span>
                        <Button onClick={handleLogout}>Log Out</Button>
                      </div>
                  }

                </div>
                :
                <div className='flex flex-col justify-center items-center'>
                  <span className='mb-2 mt-2'>No user logged in</span>
                  <Button onClick={handleLogin}>Log In</Button>
                </div>

            }

          </Dropdown.Header>
          <Dropdown.Divider />

        </Dropdown>
      </div>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Navbar.Link href="/">Home</Navbar.Link>
        <Navbar.Link href="/availablefoods">Available Foods</Navbar.Link>
        <Navbar.Link href="/addfood">Add Food</Navbar.Link>
        <Navbar.Link href="/managefoods">Manage My Foods</Navbar.Link>
        <Navbar.Link href="/requestfoods">My Food Request</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Navigationbar