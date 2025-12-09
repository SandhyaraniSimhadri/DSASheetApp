import TopicList from "../components/Topics/TopicList";

export default function Topics({ onSelectTopic }) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Topics</h2>
      <TopicList onSelectTopic={onSelectTopic} selectedTopic={{_id: ''}} />
    </div>
  );
}
