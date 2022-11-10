import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { serverUrl } from "./../constant";

const Home = () => {
  const [data, setData] = useState([]);
  const [totalPage, setTotalPage] = useState(undefined);
  const [pageNumber, setPageNumber] = useState(0);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get(`${serverUrl}?page=${pageNumber}&name=${search}`)
      .then((res) => {
        if ((res.status = 200)) {
          setData(res.data.body.getImage);
          setTotalPage(res.data.body.total);
        }
      })
      .catch((err) => console.error(err));
  }, [pageNumber, search]);
  const pages = new Array(totalPage).fill(null).map((v, i) => i);
  const searchHandler = (e) => {
    console.log(e.target.value);
    setSearch(e.target.value);
  };

  return (
    <div className="bg-[#e5e4e2] h-full">
      <div className="flex p-4 justify-center flex-col content-center gap-2">
        <h1 className="font-bold text-2xl text-center">All Images</h1>
        <input
          className="p-2 rounded"
          type="text"
          name="search"
          placeholder="Search a image"
          onChange={searchHandler}
        />
      </div>
      <div className="grid grid-cols-3 gap-6 p-4">
        {data ? (
          data.map((el, index) => {
            return (
              <div className="hover:shadow-xl duration-300 p-2 bg-white rounded">
                <Link to={`/show/${el._id}`} key={index}>
                  <img alt={el.imgName} src={el.imgURL}></img>
                </Link>
                <h3>{el.imgName}</h3>
              </div>
            );
          })
        ) : (
          <p>Add Images to get started</p>
        )}
      </div>
      <div className="p-4 flex gap-2">
        {pages &&
          pages.map((el, index) => {
            return (
              <button
                className="p-2 bg-white hover:shadow-xl rounded w-10"
                key={index}
                onClick={() => {
                  setPageNumber(el);
                }}
              >
                {el + 1}
              </button>
            );
          })}
      </div>
    </div>
  );
};

export default Home;
