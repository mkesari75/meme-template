import React from "react";
import styled from "styled-components";
import { FiEdit2 } from "react-icons/fi";
import { mobile } from "../resources/mobile";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  position: relative;
  margin-top: 50px;
  width: 360px;
  margin-bottom: 45px;
  cursor: pointer;
  border: 1px solid #373737;
  padding: 15px;
  ${mobile({ margin: "50px 15px 10px 15px" })}
`;

const Image = styled.img`
  width: 100%;
  height: 202px;
  object-fit: contain;
`;

const Details = styled.div`
  display: flex;
  margin-top: 16px;
  gap: 12px;
  color: white;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.p``;

const Icons = styled.div`
  display: flex;
  align-items: center;
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  color: white;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  transition: all 0.25s ease;
  border: 1px solid ${(props) => props.color};
  &:hover {
    color: ${(props) => props.hover};
    border-color: ${(props) => props.borderColor};
    transform: scale(1.1);
  }
`;

const GenerateCard = (props) => {
  const navigate = useNavigate();
  return (
    <>
      <Container>
        <Image key={props.id} src={props.url} alt={props.title}></Image>
        <Details>
          <Title>{props.title}</Title>
          <Icons>
            <Icon
              hover="#04D932"
              borderColor="#04D932"
              style={{ marginLeft: "10px" }}
              onClick={() => console.log("clicked")}
            >
              <FiEdit2 onClick={() => navigate(`/edit?url=${props.url}`)} />
            </Icon>
          </Icons>
        </Details>
      </Container>
    </>
  );
};

export default GenerateCard;
