export default function Profile({ user }) {
  return (
    <div>
        <h1 className="text-3xl font-bold mb-4">
            Welcome, {user.name}
        </h1>
      <h2 className="text-2xl font-bold mb-4">Profile</h2>

      <div className="bg-white shadow rounded p-4">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>
    </div>
  );
}
