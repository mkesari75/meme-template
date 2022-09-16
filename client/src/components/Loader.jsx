import React from "react";
import styled from "styled-components";
import { mobile } from "../resources/mobile";

const Container = styled.div`
  margin-top: 50px;
  width: 360px;
  margin-bottom: 45px;
  cursor: pointer;
  border: 1px solid #373737;
  padding: 15px;
  ${mobile({ margin: "50px 15px 10px 15px" })}
`;

const Image = styled.div`
  width: 100%;
  height: 202px;
  background-color: #313131;
  object-fit: contain;
  animation: skeleton 0.5s ease infinite alternate;
  @keyframes skeleton {
    to {
      opacity: 0.5;
    }
  }
`;

const Details = styled.div`
  display: flex;
  margin-top: 16px;
  gap: 12px;
  color: white;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.div`
  width: 70%;
  height: 1.2rem;
  background-color: #313131;
  animation: skeleton 0.5s ease infinite alternate;
  @keyframes skeleton {
    to {
      opacity: 0.5;
    }
  }
`;

const Icons = styled.div`
  display: flex;
  align-items: center;
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: #313131;
  animation: skeleton 0.5s ease infinite alternate;
  @keyframes skeleton {
    to {
      opacity: 0.5;
    }
  }
`;

const Tags = styled.div`
  display: flex;
  margin-top: 16px;
  gap: 12px;
  flex-wrap: wrap;
`;

const Tag = styled.div`
  padding: 4px;
  border-radius: 15px;
  background-color: #373737;
  height: 1.3rem;
  width: 20%;
  animation: skeleton 0.5s ease infinite alternate;
  @keyframes skeleton {
    to {
      opacity: 0.5;
    }
  }
`;

const Loader = () => {
  return (
    <>
      <Container>
        <Image />
        <Tags>
          <Tag />
          <Tag />
        </Tags>
        <Details>
          <Title />
          <Icons>
            <Icon />
            <Icon style={{ marginLeft: "10px" }} />
          </Icons>
        </Details>
      </Container>
    </>
  );
};

export default Loader;
