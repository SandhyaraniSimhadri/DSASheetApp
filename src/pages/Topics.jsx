import { useState, useEffect } from "react";
import TopicList from "../components/Topics/TopicList";
import ProblemList from "../components/Topics/ProblemList";
import api from "../api/axiosClient";

export default function Dashboard({ user, onLogout }) {
  const [topic, setTopic] = useState(null);
  const [keyUpdate, setKeyUpdate] = useState(1);

  useEffect(() => {
    if (user.lastTopicId) {
      api.get(`/topics/${user.lastTopicId}/problems`)
        .then(() => setTopic({ _id: user.lastTopicId }));
    }
  }, [user]);

  const updateKey = () =>{
    setKeyUpdate(prev => prev+1)
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6">
      <h2 className="text-3xl font-bold text-center mb-6">
        Welcome {user.name}
      </h2>

      <div className="flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto">

        {/* LEFT SIDEBAR — fixed width */}
        <div className="lg:w-80 w-full bg-white shadow-md rounded-lg p-4">
          <h3 className="text-xl font-semibold mb-4">Topics</h3>
          <TopicList onSelectTopic={setTopic} selectedTopic={topic} keyUpdate={keyUpdate} />
        </div>

        {/* MAIN CONTENT — stretches to remaining width */}
        <div className="flex-1 bg-white shadow-md rounded-lg p-4">
          <ProblemList topic={topic} onTick={updateKey} />
        </div>

      </div>

      <footer className="text-center mt-10 text-gray-500">
        © {new Date().getFullYear()} Dashboard. All Rights Reserved.
      </footer>
    </div>
  );
}
