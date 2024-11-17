import { create } from "zustand";

const useDiaryStore = create((set) => ({
  selectedDate: {
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  },
  setSelectedDate: (newMonth, newYear) =>
    set({ selectedDate: { month: newMonth, year: newYear } }),
}));

export default useDiaryStore;
