import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styled from "styled-components";
import Card from "../components/Card";
import axios from "axios";

const Container = styled.div`
  width: auto;
  height: auto;
  padding-bottom: 5%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #121212;
`;

const Wrapper = styled.div``;

const Share = () => {
  const [memeData, setMemeData] = useState([]);
  const [params] = useSearchParams();
  const photoMemeUrl = "http://localhost:4000/getsharedphotomeme?" + params;
  const videoMemeUrl = "http://localhost:4000/getsharedvideomeme?" + params;

  useEffect(() => {
    const getMeme = async () => {
      try {
        const res = await axios.get(photoMemeUrl);
        setMemeData(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMeme();
  }, [photoMemeUrl]);
  return (
    <>
      <Navbar dontdisplay={"none"} />
      <Container>
        <Wrapper>
          {memeData.map((meme) => {
            return (
              <Card
                key={meme._id}
                id={meme._id}
                url={meme.url}
                title={meme.title}
                tags={meme.tags}
                likes={meme.likes}
                downloads={meme.downloads}
                shares={meme.shares}
              />
            );
          })}
        </Wrapper>
      </Container>
      <Footer />
    </>
  );
};

export default Share;
