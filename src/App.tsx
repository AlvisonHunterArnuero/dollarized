import FetchData from "../src/components/FetchData";

export default function App() {
  return (
    <div className="App">
      <blockquote className="text-base md:text-md 3xl:text-lg">
        Oh I gotta get on that internet, I'm late on everything!
      </blockquote>
      <FetchData amount={100} />
    </div>
  );
}
