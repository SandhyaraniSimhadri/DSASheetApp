import { useEffect, useState } from "react";
import api from "../../api/axiosClient";

export default function TopicList({ onSelectTopic, selectedTopic, keyUpdate }) {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    api.get("/topics").then((res) => setTopics(res.data));
  }, [keyUpdate]);

  const handleSelect = async (t) => {
    onSelectTopic(t);
    await api.post("/progress/save-last-topic", { topicId: t._id });
  };

  return (
    <div className="space-y-3">
      {topics.map((t) => (
        <div
          key={t._id}
          onClick={() => handleSelect(t)}
          className={`
            cursor-pointer p-3 rounded-lg bg-blue-100 border
            border-blue-300 hover:bg-blue-200 flex justify-between items-center
            ${selectedTopic._id === t._id ? "bg-blue-400" : "bg-blue-100"}`}
        >
          <span className="font-medium">{t.title}</span>
          <span
            className={`px-2 py-1 text-xs rounded 
  ${
    t.status === "Completed"
      ? "bg-green-500 text-white"
      : "bg-yellow-500 text-white"
  }
`}
          >
            {t.status}
          </span>
        </div>
      ))}
    </div>
  );
}
