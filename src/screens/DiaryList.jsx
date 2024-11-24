import React, { useMemo } from "react";
import styled from "styled-components";
import MonthNavigation from "../components/MonthNavigation";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { moods, MoodIcon } from "../components/MoodIcons";
import { useQuery } from "@tanstack/react-query";
import {
  fetchDiaryEntries,
  useDeleteDiaryData,
} from "../components/fetchDiaryEntries";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const Container = styled.div`
  margin-top: 100px;
`;

const NoDiaryMessage = styled.span`
  font-size: 1.8rem;
  color: gray;
  text-align: center;
  display: block;
  margin-top: 100px;
`;

const StyledDiaryList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 45px;
`;

const EmotionItem = styled.div`
  background-color: #ffffff;
  width: 500px;
  padding: 20px;
  border-radius: 15px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  margin-bottom: 35px;
`;

const EmotionHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const EmotionIconWrapper = styled.div`
  padding: 10px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
`;

const DateText = styled.div`
  font-size: 1.2rem;
  color: #9e9e9e;
  font-weight: bold;
`;

const EmotionTitle = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #4a4a4a;
  margin-top: 5px;
`;

const ScoreText = styled.span`
  font-size: 1.2rem;
  color: #4a4a4a;
  margin-left: 5px;
`;

const Content = styled.div`
  font-size: 1.1rem;
  color: #333;
  margin-top: 15px;
  line-height: 1.5;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  margin-bottom: auto;
`;

const Icon = styled(FontAwesomeIcon)`
  margin-left: 15px;
  cursor: pointer;
  color: #9e9e9e;

  &:hover {
    color: #616161;
  }
`;

const DiaryList = () => {
  const { year, month } = useParams();
  const { data: diary, isLoading } = useQuery({
    queryKey: ["allDiary"],
    queryFn: fetchDiaryEntries,
  });
  console.log("isloading: ", isLoading);
  console.log("diary: ", diary);

  const { mutate: deleteDiary } = useDeleteDiaryData();

  const filteredDiary = useMemo(() => {
    if (!diary) return [];
    return diary.filter((entry) => {
      const entryDate = new Date(entry.date);
      return (
        entryDate.getMonth() + 1 === +month && entryDate.getFullYear() === +year
      );
    });
  }, [diary, month, year]);

  if (isLoading) {
    return <Container>...Loading</Container>;
  }

  if (!filteredDiary.length) {
    return (
      <Container>
        <MonthNavigation />
        <NoDiaryMessage>아직 작성된 일기가 없습니다.</NoDiaryMessage>
      </Container>
    );
  }

  return (
    <Container>
      <MonthNavigation />
      <StyledDiaryList>
        {filteredDiary.map((entry) => (
          <DiaryItem
            key={entry.id}
            entry={entry}
            onDelete={() => deleteDiary(entry.id)}
          />
        ))}
      </StyledDiaryList>
    </Container>
  );
};

const DiaryItem = ({ entry, onDelete }) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/edit-diary/${entry.id}`, { state: { diary: entry } });
  };

  const moodData = moods.find((m) => m.mood === entry.post_moods[0].mood);

  return (
    <EmotionItem>
      <EmotionHeader>
        <EmotionIconWrapper>
          {moodData && <MoodIcon mood={moodData.mood} />}
        </EmotionIconWrapper>
        <div>
          <DateText>{format(new Date(entry.date), "yyyy-MM-dd")}</DateText>
          <EmotionTitle>
            {moodData?.kr}
            <ScoreText>({entry.score} / 10)</ScoreText>
          </EmotionTitle>
        </div>
        <IconWrapper>
          <Icon icon={faPen} onClick={handleEdit} />
          <Icon icon={faTrash} onClick={onDelete} />
        </IconWrapper>
      </EmotionHeader>
      <Content>{entry.content}</Content>
    </EmotionItem>
  );
};

export default DiaryList;
