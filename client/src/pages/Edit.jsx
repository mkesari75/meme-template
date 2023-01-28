import React, { createRef } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styled from "styled-components";
import { useState } from "react";
import Text from "../resources/Text";
import { exportComponentAsJPEG } from "react-component-export-image";

const Container = styled.div`
  margin: 5%;
  height: auto;
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
`;

const Wrapper = styled.div`
  display: flex;
  height: auto;
  width: auto;
  flex-direction: column;
`;

const Div = styled.div`
  width: 30vw;
  padding-top: 5%;
  border: 1px solid black;
`;

const Image = styled.img`
  height: 300px;
  width: 300px;
  padding: 2%;
  object-fit: contain;
`;

const Button = styled.button`
  margin: 10px;
  background-color: #1877f2;
  border: none;
  border-radius: 6px;
  color: #fff;
  flex-grow: 1;
  font-size: 15px;
  height: 36px;
  line-height: 20px;
  margin-left: 8px;
  margin-right: 6px;
  min-width: 185px;
  padding: 0 16px 0 16px;
  transition: ease 0.3s;
  cursor: pointer;
  &:hover {
    background-color: #e4e6eb;
    color: #050505;
    font-size: 15px;
    transition: 0.3s;
    border: 2px solid #1877f2;
  }
`;

const Edit = () => {
  const [params] = useSearchParams();

  const [count, setCount] = useState(0);

  const addText = () => {
    setCount(count + 1);
  };

  const memeRef = createRef();

  return (
    <>
      <Navbar dontdisplay={"none"} />
      <Container>
        <Wrapper>
          <Div ref={memeRef}>
            <Image src={params.get("url")} />
            {Array(count)
              .fill(0)
              .map((e) => (
                <Text />
              ))}
          </Div>
          <Button onClick={addText}>Add Text</Button>
          <Button onClick={(e) => exportComponentAsJPEG(memeRef)}>
            Download
          </Button>
        </Wrapper>
      </Container>
      <Footer />
    </>
  );
};

export default Edit;
