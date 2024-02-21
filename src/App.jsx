import { useState } from "react";
import desktopDivider from "./assets/pattern-divider-desktop.svg";
import mobileDivider from "./assets/pattern-divider-mobile.svg";
import iconDice from "./assets/icon-dice.svg";
import { Circles as Loader } from "react-loader-spinner";

function App() {
  const [advice, setAdvice] = useState({
    advice: "Click the button to receive an advice!",
  });
  const [isLoading, setIsLoading] = useState(false);

  const adviceParagraph = <p>{advice.advice}</p>;

  function handleButtonClick() {
    setIsLoading(true);
    fetch("https://api.adviceslip.com/advice")
      .then((response) => response.json())
      .then((data) => {
        // console.log(data.slip);
        if (data) {
          setAdvice((prev) => {
            return {
              ...prev,
              id: data.slip.id,
              advice: data.slip.advice,
            };
          });
        }
      })
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));
  }

  return (
    <>
      <main className=" flex flex-col items-center bg-darkGrayishBlue text-center px-6 py-10 rounded-lg relative sm:py-[3.2rem] sm:px-12 sm:rounded-2xl">
        <h1 className=" uppercase text-neonGreen text-xs tracking-[0.24em] mb-6 sm:text-md sm:tracking-[0.4em] sm:mb-7 ">
          Advice <span>{!advice.id ? "" : `#${advice.id}`}</span>
        </h1>
        <div className="text-2xl text-lightCyan tracking-[-0.01em] sm:text-[1.7rem] sm:tracking-normal sm:leading-9 sm:mb-4">
          {!isLoading ? (
            adviceParagraph
          ) : (
            <Loader color="hsl(150, 100%, 66%)" />
          )}
        </div>
        <div className="py-6 ">
          <img src={mobileDivider} className=" sm:hidden" alt="divider" />
          <img src={desktopDivider} className="hidden sm:block" alt="divider" />
        </div>
        <button
          onClick={handleButtonClick}
          disabled={isLoading}
          className="  bg-neonGreen p-5 rounded-full btn disabled:opacity-80"
        >
          <img src={iconDice} alt="icon dice" />
        </button>
      </main>
    </>
  );
}

export default App;
