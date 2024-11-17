import React from "react";
import styled from "styled-components";

const ButtonWrap = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-top: 25px;
`;

const Button = styled.button`
  width: 150px;
  text-align: center;
  background-color: ${(props) => props.color};
  border-radius: 15px;
  font-size: 1.5rem;
  padding: 10px 15px;
  font-weight: 600;
  border: 1px solid #bebebe;
  cursor: pointer;
  &:hover {
    background-color: ${(props) =>
      props.color === "#F3F3F3" ? "#e0e0e0" : "#e6b800"};
  }
`;

const ButtonSection = ({ handleBack }) => {
  return (
    <ButtonWrap>
      <Button type="button" color="#F3F3F3" onClick={handleBack}>
        뒤로가기
      </Button>
      <Button type="submit" color="#ffdc00">
        등록
      </Button>
    </ButtonWrap>
  );
};

export default ButtonSection;
