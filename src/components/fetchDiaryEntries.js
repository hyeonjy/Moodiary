import { useMutation, useQueryClient } from "@tanstack/react-query";
import supabase from "../supabaseClient";

const addDiary = async (post) => {
  const { data: postData, error: postError } = await supabase
    .from("posts")
    .insert({
      date: post.date,
      description: post.description,
      score: post.score,
    })
    .select();

  if (postError) {
    console.log("게시글 추가 에러:", postError);
    throw new Error(postError.message);
  }

  const postId = postData[0]?.id;

  const moodInserts = post.mood.map((mood) => ({
    post_id: postId,
    mood,
  }));

  const { error: moodError } = await supabase
    .from("post_moods")
    .insert(moodInserts);

  if (moodError) {
    console.log("감정 추가 실패:", moodError);
    throw new Error(moodError.message);
  }

  return post;
};

const deleteDiary = async (id) => {
  const { data, error } = await supabase.from("posts").delete().eq("id", id);

  if (error) {
    console.log("삭제 에러:", error);
    throw new Error(error.message);
  }

  return data;
};

export const useAddDiaryData = () => {
  const queryClient = useQueryClient();

  return useMutation({
    // mutationKey: ["addDiary"],
    mutationFn: addDiary,
    onSuccess: () => {
      queryClient.invalidateQueries(["allDiary"]);
    },
  });
};

export const useDeleteDiaryData = () => {
  const queryClient = useQueryClient();

  return useMutation({
    // mutationKey: ["deleteDiary"],
    mutationFn: deleteDiary,
    onSuccess: () => {
      queryClient.invalidateQueries(["allDiary"]);
    },
  });
};

export const fetchDiaryEntries = async () => {
  const { data, error } = await supabase
    .from("posts")
    .select(
      `
      *,
      post_moods!left (id, post_id, mood)
  `
    )
    .order("date", { ascending: true });

  console.log("Fetched data with joined post_moods:", data);
  return data;
};
