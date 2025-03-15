import Layout from '@/components/layout'
import NavBar from '@/components/navbar'
import { columns } from '@/extra/table'
import { Table } from 'antd'
import React from 'react'

export default function CreateBill() {
  return (
    <Layout>
        <NavBar />
        <div className='p-4'>
        <Table columns={columns} className='shadow-md shadow-slate-500 rounded-2xl' />
        </div>
    </Layout>
  )
}
