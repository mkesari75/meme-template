import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styled from "styled-components";
import Loader from "../components/Loader";
import React, { useEffect, useState } from "react";
import axios from "axios";
import GenerateCard from "../components/GenerateCard";

const Container = styled.div`
  height: auto;
  width: 100%;
  background-color: #121212;
`;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;

//style for error container
const ErrorContainer = styled.div`
  width: 100vw;
  height: 75vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ErrorWrapper = styled.h1`
  color: white;
`;

const GenerateMeme = () => {
  //Search container getting value from child
  const [searchValue, setSearchValue] = useState("");

  const search = (value) => {
    setSearchValue(value);
  };

  //for Loader
  const [isLoading, setIsLoading] = useState(true);

  //for getting meme from api
  const [meme, setMeme] = useState([]);
  useEffect(() => {
    const getMemes = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(`http://localhost:4000/getmeme`);
        setMeme(res.data.memes);
      } catch (err) {
        console.log(err);
      }
      setIsLoading(false);
    };
    getMemes();
  }, [searchValue]);
  return (
    <>
      <Container>
        <Navbar value={search} />
        <Wrapper>
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
              {meme.length === 0 ? (
                <>
                  <ErrorContainer>
                    <ErrorWrapper>No Meme found!</ErrorWrapper>
                  </ErrorContainer>
                </>
              ) : (
                //main container
                <>
                  {meme
                    .filter(
                      (get) =>
                        get.name.toLowerCase().startsWith(searchValue) ||
                        get.name.toLowerCase().includes(searchValue)
                    )
                    .map((e) => (
                      <GenerateCard
                        key={e.id}
                        id={e.id}
                        url={e.url}
                        title={e.name}
                      />
                    ))}
                </>
              )}
            </>
          )}
        </Wrapper>
        <Footer />
      </Container>
    </>
  );
};

export default GenerateMeme;
