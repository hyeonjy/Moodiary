import React from "react";
import {
  AnxiousEmoticon,
  DepressedEmoticon,
  HappyEmoticon,
  AngryEmoticon,
  TiredEmoticon,
} from "./Emoticons";

export const moods = [
  { mood: "anxious", kr: "불안", Component: AnxiousEmoticon },
  { mood: "depressed", kr: "우울", Component: DepressedEmoticon },
  { mood: "happy", kr: "기쁨", Component: HappyEmoticon },
  { mood: "angry", kr: "분노", Component: AngryEmoticon },
  { mood: "tired", kr: "무기력", Component: TiredEmoticon },
];

export const MoodIcon = ({ mood, checked }) => {
  const IconComponent = moods.find((m) => m.mood === mood)?.Component;
  return IconComponent ? <IconComponent checked={checked} /> : null;
};
