import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DiaryForm from "../screens/DiaryForm";
import { useParams } from "react-router-dom";
import { fetchDiaryById } from "../components/fetchDiaryEntries.js";

const EditDiary = () => {
  const { id: postId } = useParams();
  const [loading, setLoading] = useState(true);
  const [postData, setPostData] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await fetchDiaryById(postId);
        if (data.length > 0) {
          setPostData(data[0]);
        } else {
          console.log("id에 해당하는 데이터 없음");
        }
      } catch (error) {
        console.error("fetchDiaryById 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!postData) {
    return <p>데이터가 없음</p>;
  }

  return <DiaryForm initialData={postData} isUpdate={true} />;
};

export default EditDiary;
