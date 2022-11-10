import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { serverUrl } from "../constant";

const ImageDetail = () => {
  const [data, setData] = useState(undefined);
  const { id } = useParams();
  const navigate = useNavigate();
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
  const deleteImageHandler = () => {
    axios
      .delete(`${serverUrl}delete/${id}`)
      .then((res) => {
        console.log(res);
        navigate("/", { replace: true });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="flex justify-center items-center h-screen bg-[#e5e4e2]">
      {data ? (
        <div className="bg-white p-4 rounded shadow-xl">
          <img src={data.imgURL} alt={data.imgName} width={300}></img>
          <p>{data.imgName}</p>
          <p>{data.imgDetails}</p>
          <div className="flex justify-between">
            <Link
              to={`/${id}/edit`}
              className="bg-blue-500 hover:bg-blue-700 duration-300 text-white font-bold py-2 px-4 rounded"
            >
              Edit
            </Link>
            <buton
              onClick={deleteImageHandler}
              className="bg-red-500 hover:bg-red-700 duration-300 cursor-pointer text-white font-bold py-2 px-4 rounded"
            >
              Delete
            </buton>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ImageDetail;
