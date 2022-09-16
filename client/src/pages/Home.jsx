import React, { useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import PhotoMeme from "../components/PhotoMeme";
import VideoMeme from "../components/VideoMeme";
import Footer from "../components/Footer";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

//Main css
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

//CSS for Toggle function
const ToggleContainer = styled.div`
  height: auto;
  width: 100vw;
  background-color: #121212;
  color: white;
  display: flex;
  justify-content: center;
  margin-top: 50px;
`;

const ToggleWrapper = styled.div`
  height: auto;
  width: auto;
  display: flex;
  background-color: #1d1d1d;
  border: 2px solid #373737;
  padding: 5px;
  border-radius: 25px;
`;

const Photo = styled.div`
  padding: 7px;
  cursor: pointer;
`;

const Video = styled.div`
  padding: 7px;
  cursor: pointer;
`;

const Active = styled.div`
  background-color: #121212;
  border-radius: 15px;
  border: 1px solid #373737;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
  margin-bottom: 30px;
  padding-left: 15px;
  height: 2.5rem;
  width: auto;
  font-size: 15px;
  font-weight: bold;
  border: 1px solid #373737;
  color: white;
  background-color: #121212;
  border-radius: 20px;
  cursor: pointer;
  &:hover {
    background-color: #373737;
  }
  &:focus {
    outline: none;
  }
`;

const Home = () => {
  //function for setting toggle Active
  const [isActive, setIsActive] = useState(true);
  const handleClick = () => {
    setIsActive(!isActive);
  };

  //show more function where showMorePhotoValue is how many cards to be shown
  const [showMorePhotoValue, setShowMorePhotoValue] = useState(3);
  const [showMoreVideoValue, setShowMoreVideoValue] = useState(3);
  //showMoreP means showMorePhoto
  const showMoreP = () => {
    setShowMorePhotoValue((prev) => prev + 2);
  };
  //showMoreV means showMoreVideo
  const showMoreV = () => {
    setShowMoreVideoValue((pre) => pre + 2);
  };

  //Disabling show more for Photos page
  const [photoCardCount, setPhotoCardCount] = useState(1);
  const numberOfCardsP = (total) => {
    setPhotoCardCount(total);
  };

  //Disabling show more for Video page which is fetching data from child
  const [videoCardCount, setVideoCardCount] = useState(1);
  const numberOfCardsV = (total) => {
    setVideoCardCount(total);
  };

  //Search container getting value from child
  const [searchValue, setSearchValue] = useState("");
  const search = (value) => {
    setSearchValue(value);
  };

  return (
    <>
      <Container>
        <Navbar value={search} />
        <Wrapper>
          <ToggleContainer>
            <ToggleWrapper>
              {isActive ? (
                <>
                  <Active>
                    <Photo>Photo</Photo>
                  </Active>
                  <Video onClick={handleClick}>Video</Video>
                </>
              ) : (
                <>
                  <Photo onClick={handleClick}>Photo</Photo>
                  <Active>
                    <Video>Video</Video>
                  </Active>
                </>
              )}
            </ToggleWrapper>
          </ToggleContainer>
          {isActive ? (
            <PhotoMeme
              photoShowMore={showMorePhotoValue}
              count={numberOfCardsP}
              searchValue={searchValue}
            />
          ) : (
            <VideoMeme
              videoShowMore={showMoreVideoValue}
              count={numberOfCardsV}
              searchValue={searchValue}
            />
          )}
        </Wrapper>
        {isActive ? (
          <>
            {/*Show more Button for Photos Page*/}
            {photoCardCount > showMorePhotoValue ? (
              <Button onClick={isActive ? showMoreP : showMoreV}>
                Show More <ArrowDropDownIcon />
              </Button>
            ) : (
              <Button
                style={{ display: "none" }}
                onClick={isActive ? showMoreP : showMoreV}
              >
                Show More <ArrowDropDownIcon />
              </Button>
            )}
          </>
        ) : (
          <>
            {/*Show more Button for Videos Page*/}
            {videoCardCount > showMoreVideoValue ? (
              <Button onClick={isActive ? showMoreP : showMoreV}>
                Show More <ArrowDropDownIcon />
              </Button>
            ) : (
              <Button
                style={{ display: "none" }}
                onClick={isActive ? showMoreP : showMoreV}
              >
                Show More <ArrowDropDownIcon />
              </Button>
            )}
          </>
        )}
        <Footer />
      </Container>
    </>
  );
};

export default Home;
