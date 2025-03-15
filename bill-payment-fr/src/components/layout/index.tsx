import React from 'react'

 function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='fixed inset-0  bg-slate-300'>
    <div className=''>{children}</div>
  </div>
  )
}

export default Layout