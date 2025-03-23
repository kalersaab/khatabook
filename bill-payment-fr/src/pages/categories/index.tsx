import Layout from '@/components/layout'
import NavBar from '@/components/navbar'
import React from 'react'

function Categories() {
  return (
    <Layout>
        <NavBar />  
        <button className='text-md bg-amber-500 rounded-md p-3 m-3 cursor-pointer'>Add Category</button>
    </Layout>
  )
}

export default Categories