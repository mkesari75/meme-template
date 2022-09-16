import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card";
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

const PhotoMeme = (props) => {
  //for setting photo from backend
  const [photo, setPhoto] = useState([]);
  //for Loader
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const res = await axios.get(
          `http://localhost:4000/photo?q=${props.searchValue}`
        );
        setPhoto(res.data);
        //As soon as data fetched sending number of elements to parent to disable showmore
      } catch (err) {
        console.log(err);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [props.searchValue]);
  //for setting total number of cards and back to parent
  useEffect(() => {
    props.count(() => photo.length);
  }, [photo.length, props]);
  return (
    <>
      {/*Logic for loading or not*/}
      {isLoading ? (
        <>
          <Loader />
          <Loader />
          <Loader />
        </>
      ) : (
        //data not found error container
        <>
          {photo.length === 0 ? (
            <>
              <Container>
                <Wrapper>No Meme found!</Wrapper>
              </Container>
            </>
          ) : (
            //main container
            <>
              {photo.slice(0, props.photoShowMore).map((meme) => (
                <Card
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

export default PhotoMeme;
