import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import InputSection from "../components/InputSection";
import ButtonSection from "../components/ButtonSection";
import {
  useAddDiaryData,
  useUpdateDiaryData,
} from "../components/fetchDiaryEntries";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  margin-top: 120px;
  width: 100%;
  display: flex;
  justify-content: center;
  height: 100vh;
`;

const DiaryForm = ({ initialData = {}, isUpdate }) => {
  const { mutate: addDiary } = useAddDiaryData();
  const { mutate: updateDiary } = useUpdateDiaryData();

  const [checkedMoods, setCheckedMoods] = useState(() => {
    const moods = initialData?.post_moods?.map((moodObj) => moodObj.mood) || [];
    return {
      anxious: moods.includes("anxious"),
      depressed: moods.includes("depressed"),
      happy: moods.includes("happy"),
      angry: moods.includes("angry"),
      tired: moods.includes("tired"),
    };
  });

  const navigate = useNavigate();

  const formattedDate = initialData.date
    ? new Date(initialData.date).toLocaleDateString("en-CA")
    : "";
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm({
    defaultValues: {
      date: formattedDate,
      content: initialData.content || "",
      mood: initialData.moods || [],
      score: initialData.score ?? "",
    },
  });

  // 초기 감정 값 설정
  useEffect(() => {
    if (initialData?.post_moods) {
      const initialMoods = initialData.post_moods.map(
        (moodObj) => moodObj.mood
      );
      setValue("mood", initialMoods); // 폼에 초기 값 설정
    }
  }, [initialData, setValue]);

  const toggleMood = (mood) => {
    setCheckedMoods((prev) => {
      const updatedMoods = { ...prev, [mood]: !prev[mood] };
      const selectedMoods = Object.keys(updatedMoods).filter(
        (key) => updatedMoods[key]
      );
      setValue("mood", selectedMoods);
      clearErrors("mood");
      return updatedMoods;
    });
  };

  console.log("checked mood: ", checkedMoods);

  const onSubmit = (data) => {
    const filteredMoods = Object.keys(checkedMoods).filter(
      (key) => checkedMoods[key]
    );
    data.mood = filteredMoods;

    const date = new Date(data.date);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;

    if (isUpdate) {
      updateDiary(
        { data, postId: initialData.id },
        {
          onSuccess: () => {
            alert("게시글 수정 성공!");
            navigate(`/diary/${year}/${month}`);
          },
          onError: (error) => alert(`게시글 수정 실패: ${error.message}`),
        }
      );
    } else {
      addDiary(data, {
        onSuccess: () => {
          alert("게시글 추가 성공!");
          navigate(`/diary/${year}/${month}`);
        },
        onError: (error) => alert(`게시글 추가 실패: ${error.message}`),
      });
    }
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
        <ButtonSection />
      </form>
    </Container>
  );
};

export default DiaryForm;
