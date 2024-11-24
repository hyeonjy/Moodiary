import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { moods, MoodIcon } from "../components/MoodIcons";

const InputWrap = styled.div`
  padding: 20px 30px;
  width: 500px;
  height: 530px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  background-color: white;
`;

const Title = styled.h1`
  font-size: clamp(2rem, 5vw + 1rem, 3.5rem);
  font-weight: 600;
  text-align: center;
`;

const InputItemWrap = styled.div`
  display: flex;
  margin-top: 20px;
  align-items: center;
`;

const Label = styled.label`
  font-size: clamp(1.5rem, 4vw + 0.5rem, 2.5rem);
  margin-right: 15px;
`;

const Input = styled.input`
  font-size: clamp(1.5rem, 4vw + 0.5rem, 0.5rem);

  font-family: "SSRONETHandwritten", sans-serif;
  border: none;
  border-bottom: 2px solid #ccc;
  outline: none;
  padding: 8px 4px;
  font-size: 1.5rem;

  &:focus {
    border-bottom-color: #ffc247;
  }
`;

const ScoreText = styled.span`
  font-size: 2rem;
  color: #555;
  margin-left: 7px;
`;

const TextInput = styled.textarea`
  width: 90vw;
  height: 20vh;
  border: 1px solid #bebebe;
  border-radius: 15px;
  margin-top: 40px;
  font-family: "SSRONETHandwritten", sans-serif;
  padding: 10px;
  resize: none;
  font-size: 1.5rem;

  &:focus {
    border-color: #ffc247 !important;
  }
`;

const MoodIconContainer = styled.div`
  position: relative;
  display: inline-flex;
  margin-right: 10px;
  cursor: pointer;
`;

const CheckIcon = styled(FontAwesomeIcon)`
  position: absolute;
  top: 15px;
  left: 18px;
  font-size: 2.8rem;
  color: green;
  transform: translate(-30%, -30%);
`;

const ErrorMessage = styled.span`
  font-size: 1.5rem;
  color: tomato;
  font-weight: 600;
  margin-top: 7px;
`;

const FormInput = ({ label, htmlFor, children }) => (
  <InputItemWrap>
    <Label htmlFor={htmlFor}>{label}</Label>
    {children}
  </InputItemWrap>
);

const InputSection = ({ errors, register, toggleMood, checkedMoods }) => {
  return (
    <InputWrap>
      <Title>감정일기</Title>

      <FormInput label="날짜" htmlFor="date">
        <Input
          type="date"
          id="date"
          {...register("date", { required: "날짜를 체크해주세요" })}
        />
      </FormInput>

      <FormInput label="감정">
        {moods.map(({ mood }) => (
          <MoodIconContainer key={mood} onClick={() => toggleMood(mood)}>
            {checkedMoods[mood] && <CheckIcon icon={faCheck} />}
            <MoodIcon mood={mood} checked={checkedMoods[mood]} />
          </MoodIconContainer>
        ))}
      </FormInput>

      <input
        type="hidden"
        {...register("mood", { required: "감정 이모지를 선택해주세요" })}
      />

      <FormInput label="기분점수" htmlFor="score">
        <Input
          type="number"
          id="score"
          min="0"
          max="10"
          {...register("score", {
            required: "점수를 입력해주세요",
            min: 0,
            max: 10,
          })}
        />
        <ScoreText>/10</ScoreText>
      </FormInput>

      <InputItemWrap>
        <TextInput
          id="content"
          placeholder="오늘의 감정을 적어보세요"
          {...register("content", { required: "일기를 작성해주세요" })}
        />
      </InputItemWrap>

      <ErrorMessage>
        {errors?.date?.message ||
          errors?.mood?.message ||
          errors?.score?.message ||
          errors?.content?.message}
      </ErrorMessage>
    </InputWrap>
  );
};

export default InputSection;
