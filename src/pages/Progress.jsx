import { useEffect, useState } from "react";
import api from "../api/axiosClient";

export default function Progress() {
  const [stats, setStats] = useState({ easy: "-", medium: "-", hard: "-" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProgress() {
      try {
        const completedRes = await api.get("/progress");
        const completedIds = completedRes.data.completedProblems.map(id => id.toString());

        const problemsRes = await api.get("/problems");
        const problems = problemsRes.data;

        let easyTotal = 0, mediumTotal = 0, hardTotal = 0;
        let easyDone = 0, mediumDone = 0, hardDone = 0;

        problems.forEach(p => {
          const isDone = completedIds.includes(p._id.toString());

          if (p.level === "easy") {
            easyTotal++;
            if (isDone) easyDone++;
          }
          if (p.level === "medium") {
            mediumTotal++;
            if (isDone) mediumDone++;
          }
          if (p.level === "hard") {
            hardTotal++;
            if (isDone) hardDone++;
          }
        });

        setStats({
          easy: easyTotal ? Math.round((easyDone / easyTotal) * 100) + "%" : "-",
          medium: mediumTotal ? Math.round((mediumDone / mediumTotal) * 100) + "%" : "-",
          hard: hardTotal ? Math.round((hardDone / hardTotal) * 100) + "%" : "-",
        });

      } catch (err) {
        console.error("Progress error:", err);
      } finally {
        setLoading(false);
      }
    }

    loadProgress();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Progress</h2>

      <div className="bg-white shadow p-6 rounded space-y-4">

        <div className="flex justify-between p-3 border-b">
          <span className="font-medium">Easy</span>
          <span className="font-bold text-blue-600">{stats.easy}</span>
        </div>

        <div className="flex justify-between p-3 border-b">
          <span className="font-medium">Medium</span>
          <span className="font-bold text-yellow-600">{stats.medium}</span>
        </div>

        <div className="flex justify-between p-3">
          <span className="font-medium">Hard</span>
          <span className="font-bold text-red-600">{stats.hard}</span>
        </div>

      </div>
    </div>
  );
}
