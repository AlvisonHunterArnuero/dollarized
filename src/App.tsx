import FetchData from "../src/components/FetchData";

export default function App() {
  return (
    <div className="container min-w-full bg-black  text-white h-screen">
      <h1 className="text-3xl p-6 font-bold text-center text-red-500">
        Worldwide Dollar Exchange App
      </h1>
      <FetchData amount={100} />
    </div>
  );
}
