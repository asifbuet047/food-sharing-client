import React from 'react'
import { IconContext } from 'react-icons'
import { CiFacebook, CiTwitter, CiYoutube } from 'react-icons/ci'
import { getProjectName } from '../../Utilities/Utilities'

function Footer() {
  return (
    <div className='w-full'>
      <footer className="footer footer-center p-10 bg-base-200 text-base-content rounded">
        <nav className="grid grid-flow-col gap-4">
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
        </nav>
        <nav>
          <div className="grid grid-flow-col gap-4">
            <IconContext.Provider value={{ color: '#55BF36', size: '5em' }}>
              <CiFacebook ></CiFacebook>
              <CiTwitter ></CiTwitter>
              <CiYoutube ></CiYoutube>
            </IconContext.Provider>
          </div>
        </nav>
        <aside>
          <p>`Copyright © 2023 - All right reserved by {getProjectName()}`</p>
        </aside>
      </footer>
    </div>
  )
}

export default Footer