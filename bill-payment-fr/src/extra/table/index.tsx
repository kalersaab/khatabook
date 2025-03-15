import { ITable } from "@/interfaces"

    export const columns:ITable[] =[{
    title:'Sr No.',
    dataIndex: 'Sr No.',
    width:100,
    render:( _:any, index:number)=>(
        <div>{index+1}</div>)
},{
    title:'Details',
    dataIndex: 'Details',
    width:100,
    render:( record:{details:string})=>(
        <div>{record?.details}</div>)
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

export const Cash:ITable[] = [{
    title:'Sr No.',
    dataIndex: 'Sr No.',
    width:100,
    render:(text:any, _:any, index:number)=>(
        <div>{index+1}</div>)
},
{
    title:'Date',
    dataIndex: 'Date',
    width:100,
    render:(text:any, record:{date:string})=>(
        <div>{record?.date}</div>)
},
{
    title:'Amount',
    dataIndex: 'Amount',
    width:100,
    render:(text:any, record:{amount:string})=>(
        <div>{record?.amount}</div>)
},{
    title:'Description',
    dataIndex: 'Description',
    width:100,
    render:(text:any, record:{description:string})=>(
        <div>{record?.description}</div>)
    
},
{
    title:'type',
    dataIndex: 'type',
    width:100,
    render:(text:any, record:{type:string})=>(
        <div>{record?.type}</div>)
},
{
    title:'Action',
    dataIndex: 'Action',
    width:100,
    render:(text:any, record:{action:string})=>(
        <div>{record?.action}</div>)
}]