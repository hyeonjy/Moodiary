import React from "react";
import styled from "styled-components";
import { ReactTyped } from "react-typed";
import { Link } from "react-router-dom";

const Container = styled.div`
  margin-top: 160px;
  /* background-color: orange; */
  width: 100%;
  /* height: 100vh; */
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-size: clamp(2rem, 5vw + 1rem, 4.5rem);
  font-weight: 600;
  margin-left: -25px;
`;

const Subtitle = styled.div`
  margin-top: 30px;
  font-size: clamp(1.5rem, 4vw + 0.5rem, 2.5rem);
`;

const Button = styled.div`
  margin-top: 55px;
  background-color: #ffdc00;
  border-radius: 15px;
  font-size: 2.5rem;
  padding: 22px 30px;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    background-color: #e6b800;
  }
`;

const TextBox = styled.div`
  margin-top: 70px;
  border: 1px solid #e0e0e0;
  color: #717171;
  font-size: clamp(1.5rem, 2vw + 1rem, 2rem);
  border-radius: 15px;
  padding: clamp(1.2rem, 5vw, 1.8rem) clamp(3.1rem, 10vw, 6.2rem)
    clamp(3.1rem, 10vw, 4.3rem) clamp(1.25rem, 5vw, 2.12rem);
  max-width: 340px;
  width: 100%;

  @media (max-width: 500px) {
    width: 70vw;
    max-width: none;
  }
`;

const Home = () => {
  return (
    <Container>
      <Title>✏️ 나만의 감정일기장</Title>
      <Subtitle>떠오르는 감정들을 편안히 채워보세요.</Subtitle>
      <Link to="/new-diary">
        <Button>일기 쓰러가기</Button>
      </Link>
      <TextBox>
        <ReactTyped
          strings={["오늘 하루는 어땠나요?"]}
          typeSpeed={100}
          backSpeed={80}
          loop
        />
      </TextBox>
    </Container>
  );
};

export default Home;
