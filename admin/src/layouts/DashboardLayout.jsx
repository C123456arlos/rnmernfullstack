// import React from 'react'
// import { Link, Outlet } from 'react-router'
// import Navbar, { NAVIGATION } from '../components/Navbar'
// import Sidebar from '../components/Sidebar'
// import { PanelLeftIcon, ShoppingBagIcon } from 'lucide-react'

// function DashboardLayout() {
//   return (
//     <div className='drawer lg:drawer-open'>
//         <input
//               id='my-drawer'
//               type='checkbox' className='drawer-toggle' defaultChecked></input>
//         <div className='drawer-content'>
//                      {/* <Navbar></Navbar> */}
//                         <label
//                     htmlFor="my-drawer" className="btn btn-square btn-ghost" aria-label='open sidebar'>
//                 <PanelLeftIcon className="size-5"></PanelLeftIcon>
//                 </label>
//         </div>
          
//     <div className="drawer-side is-drawer-close:overflow-visible">
 
//       <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>


//       <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
//             <ShoppingBagIcon className="size-6 text-primary-content"></ShoppingBagIcon>
//           </div>
//       </div>
      
   
          
//     </div>
//   )
// }

// export default DashboardLayout
import React from 'react'
import { Outlet } from 'react-router'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'

function DashboardLayout() {
  return (
      <div className='drawer 
      lg:drawer-open'
      >
          <input
              id='my-drawer'
              type='checkbox' className='drawer-toggle' defaultChecked></input>
          <div className='drawer-content'>
              <Navbar></Navbar>
                  <main className='p-6'>
          <Outlet></Outlet>
              </main>
          </div>
          
          <Sidebar></Sidebar>
          
    </div>
  )
}

export default DashboardLayout
