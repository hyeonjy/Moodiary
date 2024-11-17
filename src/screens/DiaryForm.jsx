import React, { useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import InputSection from "../components/InputSection";
import ButtonSection from "../components/ButtonSection";
import { useAddDiaryData } from "../components/fetchDiaryEntries.js";

const Container = styled.div`
  margin-top: 120px;
  width: 100%;
  display: flex;
  justify-content: center;
  height: 100vh;
`;

const DiaryForm = () => {
  const navigate = useNavigate();

  const [checkedMoods, setCheckedMoods] = useState({
    anxious: false,
    depressed: false,
    happy: false,
    angry: false,
    tired: false,
  });
  const { mutate: addDiary } = useAddDiaryData();

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm();

  const onSubmit = (data) => {
    const filteredMoods = Object.keys(checkedMoods).filter(
      (key) => checkedMoods[key]
    );
    addDiary(data, {
      onSuccess: () => {
        navigate("/record");
      },
      onError: (error) => {
        console.error("Failed to add diary:", error.message);
        alert("Failed to add diary. Please try again.");
      },
    });
  };

  const handleBack = () => {
    navigate(-1);
  };

  const toggleMood = (mood) => {
    setCheckedMoods((prev) => {
      const newCheckedMoods = { ...prev, [mood]: !prev[mood] };
      const selectedMoods = Object.keys(newCheckedMoods).filter(
        (key) => newCheckedMoods[key]
      );
      setValue("mood", selectedMoods);
      clearErrors("mood");
      return newCheckedMoods;
    });
  };

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputSection
          errors={errors}
          register={register}
          toggleMood={toggleMood}
          checkedMoods={checkedMoods}
        />
        <ButtonSection handleBack={handleBack} />
      </form>
    </Container>
  );
};

export default DiaryForm;
