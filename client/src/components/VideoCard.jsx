import React, { useState } from "react";
import styled from "styled-components";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { IoIosShareAlt } from "react-icons/io";
import axios from "axios";
import fileDownload from "js-file-download";
import ReactPlayer from "react-player";
import { mobile } from "../resources/mobile";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Tooltip from "rc-tooltip";
import "rc-tooltip/assets/bootstrap.css";
import {
  FacebookShareButton,
  FacebookIcon,
  WhatsappShareButton,
  WhatsappIcon,
  TwitterShareButton,
  TwitterIcon,
} from "react-share";

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

const ShareContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  display: ${(props) => props.displayIcon};
`;

const Share = styled.div`
  height: auto;
  width: auto;
  position: absolute;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 51%;
  background-color: white;
  border-radius: 50px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
`;

const ShareIcon = styled.div`
  padding: 5px;
  transition: all 0.25s ease;
  &:hover {
    scale: 1.1;
  }
`;

const VideoCard = (props) => {
  const [clicked, setClicked] = useState(false);

  //for clicking and unclicking like button
  const toggle = () => {
    setClicked(!clicked);
  };

  //getting likes and downloads count from db
  const [likes, setLikes] = useState(props.likes);
  const [downloads, setDownloads] = useState(props.downloads);

  //for setting the share icon and toggling it to display on click of the shareicon
  const [displayShareIcon, setDisplayShareIcon] = useState("none");
  const [toggleShareIcon, setToggleShareIcon] = useState(true);

  //for handling share icon i.e whatsapp, facebook
  const handleDisplay = () => {
    setToggleShareIcon(!toggleShareIcon);
    toggleShareIcon ? setDisplayShareIcon("") : setDisplayShareIcon("none");
  };

  //for updating like counting db
  const update = (id) => {
    clicked ? (
      <>
        {setLikes((prev) => prev - 1)}&&
        {axios.post("http://localhost:4000/videoupdatelikes", {
          id: id,
          likes: -1,
        })}
      </>
    ) : (
      <>
        {setLikes((prev) => prev + 1)}&&
        {axios.post("http://localhost:4000/videoupdatelikes", {
          id: id,
          likes: 1,
        })}
      </>
    );
  };

  //Downloading function
  const handleDownload = (url, filename, id) => {
    axios
      .get(url, {
        responseType: "blob",
      })
      .then((res) => {
        fileDownload(res.data, filename);
        //updating the downloads in db
        setDownloads((prev) => prev + 1);
        try {
          axios.post("http://localhost:4000/videoupdatedownload", {
            id: id,
          });
        } catch (err) {
          console.log(err);
        }
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

  //for handling share count
  let [shareCount, setShareCount] = useState(0);
  const handleShareCount = (id) => {
    setShareCount((prev) => prev + 1);
    try {
      axios.post("http://localhost:4000/videoupdateshares", {
        id: id,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const url = "http://localhost:3000/getsharedvideomeme?id=" + props.id;
  return (
    <>
      <Container key={props.id}>
        <ShareContainer displayIcon={displayShareIcon}>
          <Share>
            <TwitterShareButton
              url={url}
              title="Hey! checkout this amazing meme"
            >
              <ShareIcon>
                <TwitterIcon
                  size={40}
                  round={true}
                  onClick={() => handleShareCount(props.id)}
                />
              </ShareIcon>
            </TwitterShareButton>

            <WhatsappShareButton
              url={url}
              title="Hey! checkout this amazing meme"
            >
              <ShareIcon>
                <WhatsappIcon
                  size={40}
                  round={true}
                  onClick={() => handleShareCount(props.id)}
                />
              </ShareIcon>
            </WhatsappShareButton>

            <FacebookShareButton url={url} quote="Hey! checkout this meme">
              <ShareIcon>
                <FacebookIcon
                  size={40}
                  round={true}
                  onClick={() => handleShareCount(props.id)}
                />
              </ShareIcon>
            </FacebookShareButton>
          </Share>
        </ShareContainer>

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
            <Tooltip
              placement="left"
              overlay="Like"
              arrowContent={<div className="rc-tooltip-arrow-inner"></div>}
            >
              <Icon
                hover="#d90429"
                borderColor="#d90429"
                color={clicked ? "#d90429" : "white"}
                onClick={() => {
                  toggle();
                  update(props.id);
                }}
              >
                {clicked ? (
                  <FavoriteIcon style={{ color: "#d90429" }} />
                ) : (
                  <FavoriteBorderOutlinedIcon />
                )}
              </Icon>
            </Tooltip>
            <Tooltip
              placement="top"
              overlay="Download"
              arrowContent={<div className="rc-tooltip-arrow-inner"></div>}
            >
              <Icon
                hover="#0096c7"
                borderColor="#0096c7"
                style={{ marginLeft: "10px" }}
                onClick={() =>
                  handleDownload(props.url, props.title + ".mp4", props.id)
                }
              >
                <ArrowDownwardIcon />
              </Icon>
            </Tooltip>
            <Tooltip
              placement="right"
              overlay="Share"
              arrowContent={<div className="rc-tooltip-arrow-inner"></div>}
            >
              <Icon
                hover="#04D932"
                borderColor="#04D932"
                style={{ marginLeft: "10px" }}
              >
                <IoIosShareAlt
                  style={{ scale: "1.5" }}
                  onClick={() => {
                    handleDisplay();
                  }}
                />
              </Icon>
            </Tooltip>
          </Icons>
        </Details>

        <CounterContainer>
          <Counter type="likes" style={{ color: "#d90429" }}>
            {Math.abs(likes) > 999
              ? Math.sign(likes) * (Math.abs(likes) / 1000).toFixed(1) + "k"
              : Math.sign(likes) * Math.abs(likes)}
          </Counter>
          <Counter
            type="download"
            style={{ marginLeft: "10px", color: "#0096c7" }}
          >
            {Math.abs(downloads) > 999
              ? Math.sign(downloads) * (Math.abs(downloads) / 1000).toFixed(1) +
                "k"
              : Math.sign(downloads) * Math.abs(downloads)}
          </Counter>
          <Counter
            type="share"
            style={{ marginLeft: "10px", color: "#04D932" }}
          >
            {Math.abs(props.shares) > 999
              ? Math.sign(props.shares) *
                  (Math.abs(props.shares) / 1000).toFixed(1) +
                "k"
              : Math.sign(props.shares) * Math.abs(props.shares)}
          </Counter>
        </CounterContainer>

        <ToastContainer />
      </Container>
    </>
  );
};

export default VideoCard;
