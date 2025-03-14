import Layout from '@/components/layout'
import NavBar from '@/components/navbar'
import { Cash } from '@/extra/table'
import {  Modal, Table } from 'antd'
import React, { useRef } from 'react'
import type { DraggableData, DraggableEvent } from 'react-draggable';
import Draggable from 'react-draggable'


function CashManagement() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [disabled, setDisabled] = React.useState(true);
  const [bounds, setBounds] = React.useState({ left: 0, top: 0, bottom: 0, right: 0 });
  const draggleRef = useRef<HTMLDivElement>(null!);
  const formik = {
    
  }
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onStart = (_event: DraggableEvent, uiData: DraggableData) => {
    const { clientWidth, clientHeight } = window.document.documentElement;
    const targetRect = draggleRef.current?.getBoundingClientRect();
    if (!targetRect) {
      return;
    }
    setBounds({
      left: -targetRect.left + uiData.x,
      right: clientWidth - (targetRect.right - uiData.x),
      top: -targetRect.top + uiData.y,
      bottom: clientHeight - (targetRect.bottom - uiData.y),
    });
  };
  return (
  <Layout>
    <NavBar />
    <div className='p-4'>
      <Table columns={Cash} className='shadow-md shadow-slate-500 rounded-2xl' />
    </div>
       <Modal title={
          <div
            style={{ width: '100%', cursor: 'move' }}
            onMouseOver={() => {
              if (disabled) {
                setDisabled(false);
              }
            }}
            onMouseOut={() => {
              setDisabled(true);
            }}
           onFocus={() => {}}
            onBlur={() => {}}
          >
            Add Cash
          </div>
        } open={isModalOpen} onOk={handleOk} onCancel={handleCancel}  modalRender={(modal) => (
          <Draggable
            disabled={disabled}
            bounds={bounds}
            nodeRef={draggleRef}
            onStart={(event, uiData) => onStart(event, uiData)}
          >
            <div ref={draggleRef}>{modal}</div>
          </Draggable>
        )} >
        <div className='flex flex-col bg-gray-50 p-4 rounded-lg shadow-md'>
          <input type="text" className='bg-white p-2 rounded-md mb-4' placeholder='Amount'/>
          <textarea rows={4} className='bg-white p-2 rounded-md' placeholder='Notes'/>
          <div className='flex gap-4 mt-4'>
            <label>
              <input type="radio" name="transactionType" value="credit" />
              Credit
            </label>
            <label>
              <input type="radio" name="transactionType" value="debit" />
              Debit
            </label>
          </div>
        </div>
      </Modal>
    <button  onClick={showModal} className='flex justify-center items-center absolute bottom-6 right-6 p-3 bg-amber-400 rounded-full w-12 h-12 cursor-pointer hover:scale-110 hover:bg-amber-500 shadow-md shadow-slate-500'
    >
      <p className='text-5xl text-white'>+</p>
    </button>
  </Layout>
  )
}

export default CashManagement