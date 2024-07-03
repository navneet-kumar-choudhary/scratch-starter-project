import React, { useState } from "react";
import Icon from "./Icon";

export default function Sidebar({
  moveCat,
  rotateCat,
  rotateCatCounterclockwise,
  goToRandomPosition,
  glideToRandomPosition,
  pointInDirection,
  handleClick,
  replayMoves,
  showCharacter,
  hideCharacter,
  handleClickfor2sec,
}) {
  const [duration, setDuration] = useState(5);

  const handleGlide = () => {
    const parsedDuration = parseInt(duration, 10);
    if (!isNaN(parsedDuration) && parsedDuration > 0) {
      glideToRandomPosition(parsedDuration);
    }
  };

  const handleDurationChange = (e) => {
    setDuration(e.target.value);
  };
  const handlePointInDirection = (direction) => {
    pointInDirection(direction);
  };

  return (
    <div className="w-60 flex-none h-full overflow-y-auto flex flex-col items-start p-2 border-r border-gray-200">
      <div className="font-bold"> {"Events"} </div>
      <div className="flex flex-row flex-wrap bg-yellow-500 text-white px-2 py-1 my-2 text-sm cursor-pointer">
        {"When "}
        <Icon name="flag" size={15} className="text-green-600 mx-2" />
        {"clicked"}
      </div>
      <div
        className="flex flex-row flex-wrap bg-yellow-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
        onClick={replayMoves}
      >
        {"When this sprite clicked"}
      </div>
      <div className="font-bold"> {"Motion"} </div>
      <div
        className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
        onClick={moveCat}
      >
        {"Move 10 steps"}
      </div>
      <div
        className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
        onClick={rotateCatCounterclockwise}
      >
        {"Turn "}
        <Icon name="undo" size={15} className="text-white mx-2" />
        {"15 degrees"}
      </div>
      <div
        className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
        onClick={rotateCat}
      >
        {"Turn "}
        <Icon name="redo" size={15} className="text-white mx-2" />
        {"15 degrees"}
      </div>
      <div
        className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
        onClick={goToRandomPosition}
      >
        {"Go to random Position"}
      </div>
      <div
        className="flex flex-row bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer items-center"
        // onClick={glideToRandomPosition}
      >
        <span
          className="flex flex-row flex-wrap bg-transparent text-white px-2 py-1 my-2 text-sm cursor-pointer"
          onClick={handleGlide}
        >
          {"Glide "}
        </span>
        <input
          type="number"
          className="w-16 bg-green-500 text-white px-2 py-1 my-2 text-sm cursor-pointer rounded-sm"
          value={duration}
          onChange={handleDurationChange}
        />
        <span
          className="flex flex-row flex-wrap bg-transparent text-white py-1 px-2 my-2 text-sm cursor-pointer"
          onClick={handleGlide}
        >
          {"secs to random position"}
        </span>
      </div>
      <div
        className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
        onClick={() => handlePointInDirection(0)}
      >
        {"Point in direction 90"}
      </div>
      <div className="font-bold"> {"Looks"} </div>
      <div
        className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
        onClick={() => handleClick("Hello")}
      >
        {"Say Hello"}
      </div>
      <div
        className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
        onClick={() => handleClickfor2sec("Hello")}
      >
        {"Say Hello for 2 seconds"}
      </div>
      <div
        className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
        onClick={() => handleClick("Hmm...")}
      >
        {"Think Hmm"}
      </div>
      <div
        className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
        onClick={() => handleClickfor2sec("Hmm...")}
      >
        {"Think Hmm for 2 seconds"}
      </div>
      <div
        className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
        onClick={() => showCharacter()}
      >
        {"Show"}
      </div>
      <div
        className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
        onClick={() => hideCharacter()}
      >
        {"Hide"}
      </div>
    </div>
  );
}
