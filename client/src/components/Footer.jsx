import React from "react";
import styled from "styled-components";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import { mobile } from "../resources/mobile";

const Container = styled.div`
  height: auto;
  width: 100%;
  background-color: #1d1d1d;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-top: 1px solid #373737;
`;

const Section1 = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  ${mobile({ marginLeft: "2rem", marginBottom: "1rem" })}
`;

const Copyright = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 10px;
`;

const Title = styled.div`
  font-family: silkscreen;
  ${mobile({ fontSize: "20px" })}
`;

const Section2 = styled.ul`
  flex: 1;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const Link = styled.li`
  display: flex;
  justify-content: center;
  align-items: top;
  width: 100%;
  margin: 5px;
  cursor: pointer;
`;

const Section3 = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const SocialIcon = styled.div`
  cursor: pointer;
  margin: 15px;
  transform: scale(1.5);
  transition: all ease 0.25s;
  &:hover {
    color: ${(props) => props.color};
    transform: scale(1.7);
  }
`;

const Footer = () => {
  return (
    <>
      <Container>
        <Section1>
          <Copyright>&#169; 2022 All India Meme</Copyright>
          <Title>All India Meme</Title>
        </Section1>
        <Section2>
          <Link>Latest</Link>
          <Link>Trending</Link>
          <Link>Feedback</Link>
        </Section2>
        <Section3>
          <SocialIcon color="#4267B2">
            <FacebookIcon />
          </SocialIcon>
          <SocialIcon color="#C13584">
            <InstagramIcon />
          </SocialIcon>
        </Section3>
      </Container>
    </>
  );
};

export default Footer;
