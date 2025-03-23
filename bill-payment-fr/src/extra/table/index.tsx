import {  ITable } from "@/interfaces"
import { Table, TableProps } from "antd";

    export const columns:ITable[] =[{
    title:'Sr No.',
    dataIndex: 'Sr No.',
    width:50,
    render:( _:any,record:any, index:number)=>(
        <div>{index+1}</div>)
},{
    title:'Details',
    dataIndex: 'productName',
    width:100,
    render:( text:any)=>(
        <div>{text}</div>)
},
{
    title:'Quantity',
    dataIndex: 'Quantity',
    width:100,
    render:(_:any, record:{quantity:string})=>(
        <div>{record?.quantity}</div>)
},
{
    title:'Rate',
    dataIndex: 'Rate',
    width:100,
    render:(_:any, record:{rate:string})=>(
        <div>{record?.rate}</div>)
},
{
    title:'Total',
    dataIndex: 'Total',
    width:100,
    render:(text:any, record:{total:string})=>(
        <div>{record?.total}</div>)
}
]
interface TableComponentProps extends TableProps<any> {
    data: any[];
    handleDelete: (id: string) => void; 
    handleEdit: (id: string, existingData: any) => void;
  }
const TableComponent: React.FC<TableComponentProps> = ({ data, handleDelete, handleEdit, ...props }) => {
 const Cash:ITable[] = [{
    title:'Sr No.',
    dataIndex: 'Sr No.',
    width:50,
    render:(text:any, _:any, index:number)=>(
        <div>{index+1}</div>)
},
{
    title:'Date',
    dataIndex: 'Date',
    width:120,
    render:(text:any, record:{createdAt:string})=>(
        <div>{new Date(record?.createdAt).toLocaleString()}</div>)
},
{
    title:'Amount',
    dataIndex: 'Amount',
    width:70,
    render:(text:any, record:{amount:string})=>(
        <div>{record?.amount}</div>)
},{
    title:'Description',
    dataIndex: 'notes',
    width:300,
    render:(_:any, record:{notes:string})=>(
        <div>{record?.notes}</div>)
    
},
{
    title:'Type',
    dataIndex: 'type',
    width:50,
    render: (text: any, record: { type: string }) => (
        <p className={record?.type === "debit" ? "text-red-600 font-bold" : "text-green-600 font-bold" }>
         {text}
        </p>)
},
{
    title:'Action',
    dataIndex: 'Action',
    width:80,
    render:(_:any, record:{_id:string})=>(
        <div className="flex justify-between">
            <div>
        <button className="cursor-pointer text-red-500" onClick={()=>handleDelete(record?._id)} > 🗑 Delete</button>
        </div>
        <div>
        <button className="cursor-pointer text-blue-500" onClick={()=>handleEdit(record?._id, record)} > edit </button>
        </div>
        </div>)
}]
return <Table columns={Cash} dataSource={data ?? []} rowKey="_id" {...props} />;
}
export default TableComponent;