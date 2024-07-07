import React from "react";

export default function MidArea({ droppedItems, onDrop, handleExecute }) {
  const handleDrop = (e) => {
    e.preventDefault();
    const itemData = e.dataTransfer.getData("application/json");
    onDrop(itemData);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };
  const actionMap = {
    moveCat: () => handleExecute("moveCat"),
    rotateCatCounterclockwise: () => handleExecute("rotateCatCounterclockwise"),
    rotateCat: () => handleExecute("rotateCat"),
    goToRandomPosition: () => handleExecute("goToRandomPosition"),
    glideToRandomPosition: () => handleExecute("glideToRandomPosition"),
    handlePointInDirection: () => handleExecute("handlePointInDirection"),
    replayMoves: () => handleExecute("replayMoves"),
    showCharacter: () => handleExecute("showCharacter"),
    hideCharacter: () => handleExecute("hideCharacter"),
    handleClickHello: () => handleExecute("handleClickHello"),
    handleClickHmm: () => handleExecute("handleClickHmm"),
    handleClickHellofor2sec: () => handleExecute("handleClickHellofor2sec"),
    handleClickHmmfor2sec: () => handleExecute("handleClickHmmfor2sec"),
  };

  return (
    <div
      className="flex-1 h-full overflow-auto"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      {/* <div>{"Mid Area"}</div> */}
      <div className="w-1/3 p-2">
        <ul>
          {droppedItems.map((item, index) => (
            <li
              key={index}
              className={item.className}
              // onClick={() => handleExecute(item.onClick)}
              onClick={() => actionMap[item.action]()}
              draggable
            >
              {item.text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
