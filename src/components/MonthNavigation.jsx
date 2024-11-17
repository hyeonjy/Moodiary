import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import useDiaryStore from "../store/diaryStore";

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
  const { selectedDate, setSelectedDate } = useDiaryStore();
  const { month, year } = selectedDate;

  const handlePreviousMonth = () => {
    if (month === 1) {
      setSelectedDate(12, year - 1);
    } else {
      setSelectedDate(month - 1, year);
    }
  };

  const handleNextMonth = () => {
    if (month === 12) {
      setSelectedDate(1, year + 1);
    } else {
      setSelectedDate(month + 1, year);
    }
  };

  return (
    <Container>
      <NavButtonIcon position="before" onClick={handlePreviousMonth}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </NavButtonIcon>

      <MonthDisplay>{`${year}년 ${month}월`}</MonthDisplay>

      <NavButtonIcon position="after" onClick={handleNextMonth}>
        <FontAwesomeIcon icon={faChevronRight} />
      </NavButtonIcon>
    </Container>
  );
};

export default MonthNavigation;
