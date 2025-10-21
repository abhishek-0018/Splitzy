import DarkVeil from "./DarkVeil.jsx";

function App() {
  return (
    <div className="w-full h-screen flex justify-center relative">
      <div style={{ width: "100%", height: "100%", position: "relative" }}>
        <DarkVeil />
      </div>
      <div className="absolute">
        <div className="h-[500px] flex flex-col justify-between items-center mt-[50px]">
          <div className="bg-[#8e06f613] border-2 border-gray-400 rounded-4xl h-[70px] w-[700px] text-gray-400 flex items-center p-[20px] justify-between">
            <h2>SPLITZY</h2>
            <h2>Home</h2>
          </div>
          <div>
          <div className="flex flex-col justify-center items-center gap-[10px]">
            <p className="text-amber-50 font-bold text-5xl">
              You just enjoy the trip
            </p>
            <p className="text-gray-500 font-bold text-5xl">
              Let us handle math
            </p>
          </div>
          <div className="flex justify-evenly mt-[50px]">
            <button className="bg-[#100E0E] border-2 border-gray-400 rounded-4xl h-[50px] w-[150px] text-gray-400 hover:bg-white hover:text-black">
              Get Started
            </button>
            <button className="bg-[#100E0E] border-2 border-gray-400 rounded-4xl h-[50px] w-[150px] text-gray-400 hover:bg-white hover:text-black">
              Learn More
            </button>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
