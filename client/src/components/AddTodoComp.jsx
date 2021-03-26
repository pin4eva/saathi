import React, { useEffect } from "react";
import styled from "styled-components";

const AddTodoComp = () => {
  const handleClose = () => {
    const overlay = document.querySelector(".th-modal-overlay");
    overlay.classList.remove("show");
  };
  useEffect(() => {
    const overlay = document.querySelector(".th-modal-overlay");
    overlay.addEventListener("click", (e) => {
      if (
        e.target.classList.contains("th-modal") ||
        e.target.classList.contains("btn") ||
        e.target.parentElement.classList.contains("th-modal") ||
        e.target.parentElement.classList.contains("form-group")
      ) {
        console.log("yes");
      } else {
        overlay.classList.remove("show");
      }
    });
  }, []);
  return (
    <Modal className="th-modal-overlay">
      <div className="th-modal">
        <div className="th-close" onClick={handleClose}>
          <div className="wrapper">X</div>
        </div>
        <div className="content">
          <h5 className="mb-4">
            Please fill out the details below to add new ToDO
          </h5>

          <form>
            <div className="form-group">
              {/* <label>Enter Text</label> */}
              <input
                type="text"
                placeholder="Enter Text"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <textarea
                name=""
                className="form-control bg-gray"
                id=""
                cols="30"
                rows="10"
                placeholder="Enter ToDO Description Here"
              ></textarea>
            </div>

            <div className="text-center">
              <button className="btn btn-primary mt-3">Add Todo</button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default AddTodoComp;

const Modal = styled.div`
display:none;
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.6);
mix-blend-mode: normal;
transition: 0.5s ease-in-out all;
&.show{
    display: block;
}
textarea{
    background: #F7F7F7 !important;

}
  .th-modal {
    position: relative;
    width: 100%;
    max-width: 60rem;
    margin: auto;
    top: 167px;
    background: #fff;
    padding: 2rem;
    display: flex;
    justify-content:center;
    .th-close {
      background: gray;
        width: 2rem;
        height: 2rem;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 100%;
        position: absolute;
        right: 0;
        top: -1.5rem;
        right: -1.5rem;
      }
    }
  }
`;
