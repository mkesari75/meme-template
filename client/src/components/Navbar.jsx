import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Search } from "@mui/icons-material";
import { mobile } from "../resources/mobile";

const Container = styled.div`
  height: 60px;
  position: sticky;
  top: 0;
  z-index: 3;
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  background-color: #1d1d1d;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #373737;
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  text-align: center;
`;

const Logo = styled.h1`
  font-family: Silkscreen;
  font-weight: bold;
  cursor: pointer;
  ${mobile({ fontSize: "1rem" })}
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const SearchContainer = styled.div`
  display: flex;
  border: 2px solid #373737;
  padding: 5px;
  align-items: center;
  margin-left: 25px;
  width: 50%;
  justify-content: space-around;
  border-radius: 20px;
  display: ${(props) => props.dontdisplay};
  ${mobile({ width: "80%" })}
`;

const Input = styled.input`
  border: none;
  background-color: transparent;
  width: 80%;
  border-radius: 10px;
  padding-left: 10px;
  color: white;

  &::placeholder {
    color: lightgray;
    font-weight: 700;
  }

  &:focus {
    outline: none;
  }
`;

const Navbar = (props) => {
  const navigate = useNavigate();

  const searchHandler = (e) => {
    props.value(e.target.value);
  };
  return (
    <>
      <Container>
        <Wrapper>
          <Left>
            <Logo onClick={() => navigate("/")}>All India Meme</Logo>
          </Left>
          <Right>
            <SearchContainer dontdisplay={props.dontdisplay}>
              <Input placeholder="Search" onChange={searchHandler}></Input>
              <Search style={{ cursor: "pointer" }} />
            </SearchContainer>
          </Right>
        </Wrapper>
      </Container>
    </>
  );
};

export default Navbar;
