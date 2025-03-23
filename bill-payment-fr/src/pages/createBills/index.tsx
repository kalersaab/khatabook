import Layout from "@/components/layout";
import NavBar from "@/components/navbar";
import { columns } from "@/extra/table";
import { useAddBills } from "@/hooks/bills/mutation";
import { useGetBills } from "@/hooks/bills/query";
import {Modal, Table } from "antd";
import { useFormik } from "formik";
import React, { useRef } from "react";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";

export default function CreateBill() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [disabled, setDisabled] = React.useState(true);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [bounds, setBounds] = React.useState({
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  });
  const draggleRef = useRef<HTMLDivElement>(null!);
  const handleCancel = () => setIsModalOpen(!isModalOpen);
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
  const showModal = () => {
    setIsModalOpen(true);
  };
  const addBills: any = useAddBills();
  const { data, fetchNextPage, refetch }: any =
    useGetBills({});
  const getBills =
    data?.pages?.reduce(
      (acc: any, obj: any) => acc.concat(obj?.data?.data),
      []
    ) || [];
  const formik = useFormik({
    initialValues: {
      productName: "",
      quantity: 0,
      total: 0,
      rate: 0,
    },
    onSubmit: (values) => {
      addBills
        .mutateAsync({ body: values })
        .then((res: any) => {
          if (res?.status === 201) {
            setIsModalOpen(false);
            formik.resetForm({ values: formik.initialValues });
            refetch();
          }
        })
        .catch((err: { message: string }) => {
          console.log(err.message);
        });
    },
  });
  const handleTableChange = (pagination: any) => {
    setCurrentPage(pagination.current);
    fetchNextPage();
  };
  const number: number = data?.pages?.[0]?.data?.count
  return (
    <Layout>
      <NavBar />
      <div className="p-4">
        <Table
          columns={columns}
          dataSource={getBills}
          className="shadow-md shadow-slate-500 rounded-2xl"
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
            Quick Bill
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
        <form
          onSubmit={(event) => {
            event.preventDefault();
            formik.handleSubmit();
          }}
        >
          <div className="flex flex-col bg-gray-50 p-4 rounded-lg shadow-md w-96 mx-auto">
  {/* Quantity Field */}
  <label className="flex flex-col mb-2">
    <span className="mb-1 font-medium">Quantity</span>
    <input
      type="number"
      className="bg-white p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder="Enter quantity"
      name="quantity"
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      value={formik.values.quantity}
    />
    {formik.touched.quantity && formik.errors.quantity && (
      <p className="text-red-500 text-sm mt-1">{formik.errors.quantity}</p>
    )}
  </label>

  {/* Rate Field */}
  <label className="flex flex-col mb-2">
    <span className="mb-1 font-medium">Rate</span>
    <input
      type="number"
      className="bg-white p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder="Enter rate"
      name="rate"
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      value={formik.values.rate}
    />
    {formik.touched.rate && formik.errors.rate && (
      <p className="text-red-500 text-sm mt-1">{formik.errors.rate}</p>
    )}
  </label>

  {/* Product Name Field */}
  <label className="flex flex-col mb-2">
    <span className="mb-1 font-medium">Product Name</span>
    <input
      type="text"
      className="bg-white p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder="Enter product name"
      name="productName"
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      value={formik.values.productName}
    />
    {formik.touched.productName && formik.errors.productName && (
      <p className="text-red-500 text-sm mt-1">{formik.errors.productName}</p>
    )}
  </label>

  {/* Submit Button */}
  <button
    type="submit"
    className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md"
  >
    Submit
  </button>
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
