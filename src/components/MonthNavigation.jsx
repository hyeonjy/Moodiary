import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router-dom";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

const NavButtonIcon = styled.div`
  display: inline-flex;
  align-items: center;
  margin: ${(props) =>
    props.position === "before" ? "0 8px 0 0" : "0 0 0 8px"};
  font-size: 1.5rem;
  cursor: pointer;
`;

const MonthDisplay = styled.h2`
  font-size: 1.8rem;
  font-weight: bold;
  margin: 0 20px;
`;

const MonthNavigation = () => {
  const { year, month } = useParams();
  const navigate = useNavigate();

  const handleMonthChange = (offset) => {
    const newDate = new Date(
      parseInt(year, 10),
      parseInt(month, 10) - 1 + offset
    );

    // URL 업데이트
    navigate(`/diary/${newDate.getFullYear()}/${newDate.getMonth() + 1}`);
  };

  return (
    <Container>
      <NavButtonIcon position="before" onClick={() => handleMonthChange(-1)}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </NavButtonIcon>

      <MonthDisplay>{`${year}년 ${month}월`}</MonthDisplay>

      <NavButtonIcon position="after" onClick={() => handleMonthChange(1)}>
        <FontAwesomeIcon icon={faChevronRight} />
      </NavButtonIcon>
    </Container>
  );
};

export default MonthNavigation;
