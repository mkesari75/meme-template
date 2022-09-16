import React, { useState } from "react";
import styled from "styled-components";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import axios from "axios";
import fileDownload from "js-file-download";
import ReactPlayer from "react-player";
import { mobile } from "../resources/mobile";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Container = styled.div`
  margin-top: 50px;
  width: 360px;
  margin-bottom: 45px;
  cursor: pointer;
  border: 1px solid #373737;
  padding: 15px;
  ${mobile({ margin: "50px 15px 10px 15px" })}
`;

const Video = styled.div`
  width: 100%;
  height: 202px;
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

const CounterContainer = styled.div`
  display: flex;
  align-items: center;
  width: auto;
  margin-top: 5px;
  justify-content: flex-end;
`;

const Counter = styled.div`
  width: 40px;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
`;

const Tags = styled.div`
  display: flex;
  margin-top: 16px;
  gap: 12px;
  color: white;
  flex-wrap: wrap;
`;

const Tag = styled.div`
  padding: 4px;
  border: 1px solid white;
  border-radius: 15px;
  background-color: #373737;
  font-size: 10px;
`;

const VideoCard = (props) => {
  const [clicked, setClicked] = useState(false);

  //for clicking and unclicking like button
  const toggle = () => {
    setClicked(!clicked);
  };
  //Downloading function
  const handleDownload = (url, filename) => {
    axios
      .get(url, {
        responseType: "blob",
      })
      .then((res) => {
        fileDownload(res.data, filename);
        toast.success("Downloaded Successfully!", {
          position: "bottom-right",
          theme: "colored",
          autoClose: 2000,
        });
      })
      .catch((err) => {
        toast.error("Download Failed", {
          position: "bottom-right",
          theme: "colored",
          autoClose: 2000,
        });
        console.log(err);
      });
  };

  return (
    <>
      <Container key={props.id}>
        <Video>
          <ReactPlayer url={props.url} height="202px" width="100%" controls />
        </Video>
        <Tags>
          {props.tags.map((tag) => (
            <Tag>{"#" + tag}</Tag>
          ))}
        </Tags>
        <Details>
          <Title>{props.title}</Title>
          <Icons>
            <Icon
              hover="#d90429"
              borderColor="#d90429"
              color={clicked ? "#d90429" : "white"}
              onClick={toggle}
            >
              {clicked ? (
                <FavoriteIcon style={{ color: "#d90429" }} />
              ) : (
                <FavoriteBorderOutlinedIcon />
              )}
            </Icon>
            <Icon
              hover="#0096c7"
              borderColor="#0096c7"
              style={{ marginLeft: "10px" }}
              onClick={() => handleDownload(props.url, props.title + ".mp4")}
            >
              <ArrowDownwardIcon />
            </Icon>
          </Icons>
        </Details>
        <CounterContainer>
          <Counter type="likes" style={{ color: "#d90429" }}>
            {Math.abs(props.likes) > 999
              ? Math.sign(props.likes) *
                  (Math.abs(props.likes) / 1000).toFixed(1) +
                "k"
              : Math.sign(props.likes) * Math.abs(props.likes)}
          </Counter>
          <Counter
            type="download"
            style={{ marginLeft: "10px", color: "#0096c7" }}
          >
            {Math.abs(props.downloads) > 999
              ? Math.sign(props.downloads) *
                  (Math.abs(props.downloads) / 1000).toFixed(1) +
                "k"
              : Math.sign(props.downloads) * Math.abs(props.downloads)}
          </Counter>
        </CounterContainer>
        <ToastContainer />
      </Container>
    </>
  );
};

export default VideoCard;
