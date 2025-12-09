import { useEffect, useState } from "react";
import api from "../../api/axiosClient";

export default function ProblemList({ topic, onTick }) {
  const [problems, setProblems] = useState([]);
  const [completed, setCompleted] = useState([]);

  useEffect(() => {
    if (!topic) return;

    api
      .get(`/topics/${topic._id}/problems`)
      .then((res) => setProblems(res.data));
  }, [topic]);

  useEffect(() => {
    api
      .get("/progress")
      .then((res) => setCompleted(res.data.completedProblems));
  }, []);

  const toggle = async (problemId) => {
    const done = !completed.includes(problemId);
    const res = await api.post("/progress/toggle", {
      problemId,
      completed: done,
    });
    setCompleted(res.data.completedProblems);
    onTick?.();
  };

  if (!topic) {
    return <p className="text-gray-600 text-center">Select a topic to start</p>;
  }

  return (
    <div
      className="overflow-x-auto 
    [&::-webkit-scrollbar]:h-2
    [&::-webkit-scrollbar]:h-2
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:bg-gray-300
  dark:[&::-webkit-scrollbar-track]:bg-neutral-700
  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
    >
      <h3 className="text-xl font-bold mb-4">{topic.title}</h3>

      <table className="w-full border-collapse text-left shadow-md">
        <thead>
          <tr className="bg-blue-600 text-white">
            <th className="p-3">✔</th>
            <th className="p-3">Name</th>
            <th className="p-3">LeetCode</th>
            <th className="p-3">YouTube</th>
            <th className="p-3">Article</th>
            <th className="p-3">Level</th>
            <th className="p-3">Status</th>
          </tr>
        </thead>

        <tbody>
          {problems.map((p) => (
            <tr key={p._id} className="border-b hover:bg-gray-50">
              <td className="p-3">
                <input
                  type="checkbox"
                  checked={completed.includes(p._id)}
                  onChange={() => toggle(p._id)}
                />
              </td>

              <td className="p-3">{p.title}</td>

              <td className="p-3 text-blue-600">
                <a href={p.leetcodeUrl} target="_blank">
                  Practise
                </a>
              </td>

              <td className="p-3 text-blue-600">
                <a href={p.youtubeUrl} target="_blank">
                  Watch
                </a>
              </td>

              <td className="p-3 text-blue-600">
                <a href={p.articleUrl} target="_blank">
                  Read
                </a>
              </td>

              <td className="p-3 font-bold">{p.level.toUpperCase()}</td>

              <td className="p-3">
                {completed.includes(p._id) ? (
                  <span className="text-green-600 font-medium">Done</span>
                ) : (
                  <span className="text-red-500 font-medium">Pending</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
