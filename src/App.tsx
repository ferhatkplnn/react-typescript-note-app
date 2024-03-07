import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <div className="p-10 container h-screen">
      <Outlet />
    </div>
  );
};

export default App;
