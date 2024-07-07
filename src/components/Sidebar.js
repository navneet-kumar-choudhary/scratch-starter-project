import React, { useState } from "react";
import Icon from "./Icon";

export default function Sidebar({
  moveCat,
  rotateCat,
  rotateCatCounterclockwise,
  goToRandomPosition,
  glideToRandomPosition,
  pointInDirection,
  // handleClick,
  replayMoves,
  showCharacter,
  hideCharacter,
  handleClickfor2sec,
  onDrop,
  handleExecute,
  handleClickHello,
  handleClickHmm,
  handleClickHellofor2sec,
  handleClickHmmfor2sec,
}) {
  const [duration, setDuration] = useState(5);

  const handleGlide = () => {
    const parsedDuration = parseInt(duration, 10);
    if (!isNaN(parsedDuration) && parsedDuration > 0) {
      glideToRandomPosition(parsedDuration);
    }
  };

  // const handleDurationChange = (e) => {
  //   setDuration(e.target.value);
  // };

  // const handleDragStart = (e, action) => {
  //   e.dataTransfer.setData(
  //     "application/json",
  //     JSON.stringify({
  //       text: action.text,
  //       onClick: action.onClick,
  //       className: action.className,
  //     })
  //   );
  // };

  const handleDurationChange = (e) => {
    setDuration(e.target.value);
  };

  const handleDragStart = (e, item) => {
    e.dataTransfer.setData("application/json", JSON.stringify(item));
  };

  const handlePointInDirection = (direction) => {
    pointInDirection(direction);
  };

  const actions = [
    {
      text: (
        <>
          {"When "}
          <Icon name="flag" size={15} className="text-green-600 mx-2" />
          {"clicked"}
        </>
      ),
      action: () => {},
      className:
        "flex flex-row flex-wrap bg-yellow-500 text-white px-2 py-1 my-2 text-sm cursor-pointer",
    },
    {
      text: "When this sprite clicked",
      action: () => {},
      className:
        "flex flex-row flex-wrap bg-yellow-500 text-white px-2 py-1 my-2 text-sm cursor-pointer",
    },
    {
      text: "Replay Moves",
      action: "replayMoves",
      className:
        "flex flex-row flex-wrap bg-yellow-500 text-white px-2 py-1 my-2 text-sm cursor-pointer",
    },
    {
      text: "Move 10 steps",
      action: "moveCat",
      className:
        "flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer",
    },
    {
      text: "Turn anti-clockwise 15 degrees",
      // (
      //   <>
      //     {"Turn anti-clockwise "}
      //     <Icon name="undo" size={15} className="text-white mx-2" />
      //     {"15 degrees"}
      //   </>
      // ),
      action: "rotateCatCounterclockwise",
      className:
        "flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer",
    },
    {
      text: "Turn clock-wise 15 degrees",
      // text: (
      //   <>
      //     {"Turn clock-wise "}
      //     <Icon name="redo" size={15} className="text-white mx-2" />
      //     {"15 degrees"}
      //   </>
      // ),
      action: "rotateCat",
      className:
        "flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer",
    },
    {
      text: "Point in direction 90",
      action: "handlePointInDirection",
      className:
        "flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer",
    },
    {
      text: "Go to random Position",
      action: "goToRandomPosition",
      className:
        "flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer",
    },
    // {
    //   text: (
    //     <>
    //       <span
    //         className="flex flex-row flex-wrap bg-transparent text-white px-2 py-1 my-2 text-sm cursor-pointer"
    //         action={handleGlide}
    //       >
    //         {"Glide "}
    //       </span>
    //       <input
    //         type="number"
    //         className="w-16 bg-green-500 text-white px-2 py-1 my-2 text-sm cursor-pointer rounded-sm"
    //         value={duration}
    //         onChange={handleDurationChange}
    //       />
    //       <span
    //         className="flex flex-row flex-wrap bg-transparent text-white py-1 px-2 my-2 text-sm cursor-pointer"
    //         action={handleGlide}
    //       >
    //         {"secs to random position"}
    //       </span>
    //     </>
    //   ),
    //   action: "handleGlide",
    //   className:
    //     "flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer",
    // },
    {
      text: "Say Hello",
      action: "handleClickHello",
      className:
        "flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer",
    },
    {
      text: "Say Hello for 2 seconds",
      action: "handleClickHellofor2sec",
      className:
        "flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer",
    },
    {
      text: "Think Hmm",
      action: "handleClickHmm",
      className:
        "flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer",
    },
    {
      text: "Think Hmm for 2 seconds",
      action: "handleClickHmmfor2sec",
      className:
        "flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer",
    },
    {
      text: "Show",
      action: "showCharacter",
      className:
        "flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer",
    },
    {
      text: "Hide",
      action: "hideCharacter",
      className:
        "flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer",
    },
  ];

  return (
    <div className="w-1/4 h-full flex flex-col border-r border-gray-200 p-2 overflow-auto">
      <div className="font-bold">{"Events"}</div>

      {actions.slice(0, 3).map((action, index) => (
        <div
          key={index}
          className={action.className}
          onClick={() => handleExecute(action.action)}
          draggable
          onDragStart={(e) => handleDragStart(e, action)}
        >
          {action.text}
        </div>
      ))}
      <div className="font-bold">{"Motion"}</div>
      {actions.slice(3, 8).map((action, index) => (
        <div
          key={index}
          className={action.className}
          // onClick={action.onClick}
          onClick={() => handleExecute(action.action)}
          draggable
          onDragStart={(e) => handleDragStart(e, action)}
        >
          {action.text}
        </div>
      ))}
      <div className="font-bold">{"Looks"}</div>
      {actions.slice(8).map((action, index) => (
        <div
          key={index}
          className={action.className}
          // onClick={action.action}
          onClick={() => handleExecute(action.action)}
          draggable
          onDragStart={(e) => handleDragStart(e, action)}
        >
          {action.text}
        </div>
      ))}
    </div>
  );
}
