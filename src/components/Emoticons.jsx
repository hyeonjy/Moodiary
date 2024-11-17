import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFaceAngry,
  faFaceFrown,
  faFaceLaughSquint,
  faFaceMeh,
  faFaceSadTear,
} from "@fortawesome/free-solid-svg-icons";

const EmoticonWrapper = styled.div`
  font-size: 50px;
  color: ${(props) => (props.checked ? "#343434" : props.color)};
  margin-right: 10px;
`;

const DepressedEmoticon = ({ checked }) => (
  <EmoticonWrapper color="#6699FF" checked={checked}>
    <FontAwesomeIcon icon={faFaceSadTear} />
  </EmoticonWrapper>
);

const AnxiousEmoticon = ({ checked }) => (
  <EmoticonWrapper color="#ff9a19" checked={checked}>
    <FontAwesomeIcon icon={faFaceFrown} />
  </EmoticonWrapper>
);

const HappyEmoticon = ({ checked }) => (
  <EmoticonWrapper color="#FFD700" checked={checked}>
    <FontAwesomeIcon icon={faFaceLaughSquint} />
  </EmoticonWrapper>
);

const AngryEmoticon = ({ checked }) => (
  <EmoticonWrapper color="tomato" checked={checked}>
    <FontAwesomeIcon icon={faFaceAngry} />
  </EmoticonWrapper>
);

const TiredEmoticon = ({ checked }) => (
  <EmoticonWrapper color="gray" checked={checked}>
    <FontAwesomeIcon icon={faFaceMeh} />
  </EmoticonWrapper>
);

export {
  AnxiousEmoticon,
  DepressedEmoticon,
  HappyEmoticon,
  AngryEmoticon,
  TiredEmoticon,
};
