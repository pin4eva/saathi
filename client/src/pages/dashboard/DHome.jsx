import React from "react";
import styled from "styled-components";

const DHomePage = () => {
  const openModal = () => {
    const overlay = document.querySelector(".th-modal-overlay");
    overlay.classList.add("show");
  };
  return (
    <Wrapper className="">
      <p className="my-3 text-primary">Hello, Kenneth</p>
      <div className="card home-card">
        <h3>
          <span className="text-primary">Saathi ToDo</span> helps you <br />{" "}
          schedule your tasks.
        </h3>

        <p>
          Your task schedule is empty, click the Plus to add your first Task
        </p>
      </div>

      <img
        src="/images/plus-icon.svg"
        onClick={openModal}
        className="plus-icon openModal c-hand"
        alt=""
        height="70"
        width="70"
      />
    </Wrapper>
  );
};

export default DHomePage;

const Wrapper = styled.div`
  position: relative;
  .plus-icon {
    position: absolute;
    right: 0;
    top: 0;
    cursor: pointer;
  }
  .home-card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    h3 {
      font-size: 2rem;
    }
  }
`;
