import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { serverUrl } from "../constant";

const EditImage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`${serverUrl}${id}`)
      .then((res) => {
        if ((res.status = 200)) {
          setData(res.data.body);
        }
      })
      .catch((err) => console.error(err));
  }, [id]);

  const initialValues = {
    imgName: data.imgName,
    imgURL: data.imgURL,
    imgDetails: data.imgDetails,
  };
  const onSubmit = (values) => {
    axios
      .put(`${serverUrl}${id}/edit`, values)
      .then((res) => {
        if ((res.status = 200)) {
          toast.success("Image updated!");
          navigate(`/show/${id}`);
        }
      })
      .catch((err) => console.error(err));
  };
  const validationSchema = Yup.object({
    imgName: Yup.string().required("Required!"),
    imgURL: Yup.string().required("Required!"),
    imgDetails: Yup.string().required("Required!"),
  });
  const inputStyle = `block px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition
  ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`;
  const errorComp = (msg) => (
    <div className="text-red-500 inline-block mb-2">{msg}</div>
  );
  return (
    <div className="bg-[#e5e4e2] flex justify-center items-center h-screen">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        enableReinitialize
      >
        <Form className="shadow-lg flex flex-col rounded bg-white justify-evenly p-8 md:w-[80%] lg:w-[60%] h-4/5">
          <div className="m-2 flex-col flex justify-evenly">
            <label
              htmlFor="imgName"
              className="inline-block mb-2 text-gray-700"
            >
              ImgName
            </label>
            <Field
              type="text"
              id="imgName"
              name="imgName"
              className={inputStyle}
            />
            <ErrorMessage name="imgName">{errorComp}</ErrorMessage>
          </div>

          <div className="m-2 flex-col flex justify-evenly">
            <label htmlFor="imgURL" className="inline-block mb-2 text-gray-700">
              ImgURL
            </label>
            <Field
              type="text"
              id="imgURL"
              name="imgURL"
              className={inputStyle}
            />
            <ErrorMessage name="imgURL">{errorComp}</ErrorMessage>
          </div>

          <div className="m-2 flex-col flex justify-evenly">
            <label
              htmlFor="imgDetails"
              className="inline-block mb-2 text-gray-700"
            >
              imgDetails
            </label>
            <Field
              type="text"
              id="imgDetails"
              name="imgDetails"
              className={inputStyle}
            />
            <ErrorMessage name="imgDetails">{errorComp}</ErrorMessage>
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Update
          </button>
        </Form>
      </Formik>
      <ToastContainer />
    </div>
  );
};

export default EditImage;
