import React, { useEffect, useState } from "react";
import VideoCard from "./VideoCard";
import axios from "axios";
import Loader from "./Loader";
import styled from "styled-components";

//style for error container
const Container = styled.div`
  width: 100vw;
  height: 60vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.h1`
  color: white;
`;

const VideoMeme = (props) => {
  //setting video from backend
  const [video, setVideo] = useState([]);
  //setting loader
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(
          `https://meme-template-mern.herokuapp.com/video?q=${props.searchValue}`
        );
        setVideo(res.data);
      } catch (err) {
        console.log(err);
      }
      setTimeout(function () {
        setIsLoading(false);
      }, 1000);
    };
    fetchData();
  }, [props.searchValue]);
  //for setting total number of cards and back to parent
  useEffect(() => {
    props.count(video.length);
  }, [props, video.length]);

  return (
    <>
      {isLoading ? (
        <>
          <Loader />
          <Loader />
          <Loader />
        </>
      ) : (
        //data not found error container
        <>
          {video.length === 0 ? (
            <>
              <Container>
                <Wrapper>No Meme found!</Wrapper>
              </Container>
            </>
          ) : (
            <>
              {video.slice(0, props.videoShowMore).map((meme) => (
                <VideoCard
                  key={meme._id}
                  id={meme._id}
                  url={meme.url}
                  title={meme.title}
                  tags={meme.tags}
                  likes={meme.likes}
                  downloads={meme.downloads}
                />
              ))}
            </>
          )}
        </>
      )}
    </>
  );
};

export default VideoMeme;
