import React from 'react'
import { Navbar } from 'flowbite-react'

function Navigationbar() {
  return (
    <div className='border-2 border-red-800'>
      <Navbar fluid rounded>
        <Navbar.Brand href="https://flowbite-react.com">
          <img src="/favicon.svg" className="mr-3 h-6 sm:h-9" alt="Our Logo" />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Community Food Sharing</span>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Navbar.Link href='/' active>Home</Navbar.Link>
          <Navbar.Link href='/availablefoods'>Available Foods</Navbar.Link>
          <Navbar.Link href='/addfood'>Add Food</Navbar.Link>
          <Navbar.Link href='/managefood'>Manage My Foods</Navbar.Link>
          <Navbar.Link href='/requestfood'>My Food Request</Navbar.Link>
          <Navbar.Link href='/signin'>Join Us</Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}

export default Navigationbar