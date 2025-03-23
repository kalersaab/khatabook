import Layout from "@/components/layout";
import NavBar from "@/components/navbar";
import TableComponent from "@/extra/table";
import { useAddCash, useDeleteCash, useUpdateCash } from "@/hooks/cash/mutation";
import { useGetCash } from "@/hooks/cash/query";
import { err, IFormikCash } from "@/interfaces";
import { Button, message, Modal } from "antd";
import { useFormik } from "formik";
import React, { useRef } from "react";
import type { DraggableData, DraggableEvent } from "react-draggable";
import Draggable from "react-draggable";

function CashManagement() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [disabled, setDisabled] = React.useState(true);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [id, setId] = React.useState('')
  const [bounds, setBounds] = React.useState({
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  });
  const draggleRef = useRef<HTMLDivElement>(null!);
  const addCash: any = useAddCash();
  const deleteCash:any = useDeleteCash()
  const updateCash:any = useUpdateCash()
  const { data, isFetchingNextPage, fetchNextPage, refetch, error, }:any =
    useGetCash({ keyword: "", type: "" });
  const getCash =
    data?.pages?.reduce(
      (acc: any, obj: any) => acc.concat(obj?.data?.cash),
      []
    ) || [];
      const formik = useFormik<IFormikCash>({
    initialValues: {
      amount: "",
      notes: "",
      type: "credit",
    },
      enableReinitialize: true,
    onSubmit: (values) => {
      if(id){
        updateCash
         .mutateAsync({ pathParams:{id:id}, body: values })
         .then((res: any) => {
            if (res?.status === 201) {
              setIsModalOpen(false);
              formik.resetForm();
              setId("")
              refetch();
              message.success(res?.message);
            } else {
              message.error(res?.message);
            }
          })
         .catch((err: err) => message.error(err?.message));
      } else{
      addCash
        .mutateAsync({ body: values })
        .then((res: any) => {
          if (res?.status === 201) {
            setIsModalOpen(false);
            formik.resetForm();
            refetch();
            message.success(res?.message);
          } else {
            message.error(res.message);
          }
        })
        .catch((err: err) => message.error(err?.message));
      }
    },
  });
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel =()=>setIsModalOpen(!isModalOpen)
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
  const handleTableChange = (pagination: any) => {
    setCurrentPage(pagination.current);
    fetchNextPage();
  };

  const handleDelete = (id:string)=>{
    deleteCash.mutateAsync({id:id}).then((res:any)=>{
      if(res?.status === 200){
        refetch();
        message.success('Cash deleted successfuly')
      }
    }).catch((err:err)=>message.error(err?.message))
  }
  const handleUpdate = (id: string, existingData: any) => {
    if (id) {
      setId(id);
      formik.setValues(existingData); 
      setIsModalOpen(true);
    }
  };
  
  const number: number = data?.pages?.[0]?.data?.count
  return (
    <Layout>
      <NavBar />
      <div className="p-4">
      <TableComponent
  data={error ? [] : getCash}
  handleDelete={handleDelete}
  handleEdit={handleUpdate}
  pagination={{
    total: number,
    current: currentPage,
    pageSize: 10,
  }}
  onChange={handleTableChange}
  scroll={{
    x: "70%",
    y: "calc(90vh - 245px)",
  }}
  className="w-full backdrop-blur"
  loading={isFetchingNextPage}
/>
      </div>
      <Modal
      onCancel={handleCancel}
        title={
          <div
            style={{ width: "100%", cursor: "move" }}
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
        }
        open={isModalOpen}
        footer={null}
        modalRender={(modal) => (
          <Draggable
            disabled={disabled}
            bounds={bounds}
            nodeRef={draggleRef}
            onStart={(event, uiData) => onStart(event, uiData)}
          >
            <div ref={draggleRef}>{modal}</div>
          </Draggable>
        )}
      >
        <form onSubmit={formik.handleSubmit}>
          <div className="flex flex-col bg-gray-50 p-4 rounded-lg shadow-md">
            <input
              type="number"
              className="bg-white p-2 rounded-md mb-4"
              placeholder="Amount"
              name="amount"
              onChange={formik?.handleChange}
              value={formik?.values?.amount}
            />
            <textarea
              rows={4}
              className="bg-white p-2 rounded-md"
              placeholder="Notes"
              name="notes"
              onChange={formik?.handleChange}
              value={formik?.values?.notes}
            />
            <div className="flex gap-4 mt-4">
              <label>
                <input
                  type="radio"
                  name="type"
                  value="credit"
                  onChange={formik.handleChange}
                  checked={formik.values.type === "credit"} // Set checked state based on Formik's value
                />
                Credit
              </label>
              <label>
                <input
                  type="radio"
                  name="type"
                  value="debit"
                  onChange={formik.handleChange}
                  checked={formik.values.type === "debit"}
                />
                Debit
              </label>
            </div>
            <Button
              type="primary"
              htmlType="submit"
              className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white"
            >
              Submit
            </Button>
          </div>
        </form>
      </Modal>
      <button
        onClick={showModal}
        className="flex justify-center items-center absolute bottom-6 right-6 p-3 bg-amber-400 rounded-full w-12 h-12 cursor-pointer hover:scale-110 hover:bg-amber-500 shadow-md shadow-slate-500"
      >
        <p className="text-5xl text-white">+</p>
      </button>
    </Layout>
  );
}

export default CashManagement;
