import { useOutletContext } from "react-router-dom";

const JoiningRequests = () => {
  const { group, currentUser, userStatus } = useOutletContext();

  return (
    <div className="p-4 text-white">
      <h2>Joining Requests for {group.title}</h2>
      <p>User: {currentUser.name}</p>
      <p>Status: {userStatus}</p>
    </div>
  );
};

export default JoiningRequests;
