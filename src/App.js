import React, { useRef, useState } from "react";
import Sidebar from "./components/Sidebar";
import MidArea from "./components/MidArea";
import PreviewArea from "./components/PreviewArea";
// import "./index.css";

export default function App() {
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [rotation, setRotation] = useState(0);
  const [isGlide, setIsGlide] = useState(false);
  const [duration, setDuration] = useState(0);
  const [popoverVisible, setPopoverVisible] = useState(false);
  const [popoverPosition, setPopoverPosition] = useState({ x: 0, y: 0 });
  const previewAreaRef = useRef(null);
  const [moveHistory, setMoveHistory] = useState([]);
  const [text, setText] = useState(null);
  const [show, setShow] = useState(true);
  const [droppedItems, setDroppedItems] = useState([]);

  const moveCat = () => {
    setPosition((prevPosition) => {
      const newPosition = { x: prevPosition.x + 10, y: prevPosition.y + 2 };
      setMoveHistory((prevHistory) => [
        ...prevHistory,
        { type: "move", position: newPosition },
      ]);
      return newPosition;
    });
  };

  const rotateCat = () => {
    setRotation((prevRotation) => {
      const newRotation = prevRotation + 15;
      setMoveHistory((prevHistory) => [
        ...prevHistory,
        { type: "rotate", rotation: newRotation },
      ]);
      return newRotation;
    });
  };

  const rotateCatCounterclockwise = () => {
    setRotation((prevRotation) => {
      const newRotation = prevRotation - 15;
      setMoveHistory((prevHistory) => [
        ...prevHistory,
        { type: "rotate", rotation: newRotation },
      ]);
      return newRotation;
    });
  };

  const goToRandomPosition = () => {
    setIsGlide(false);

    const previewArea = previewAreaRef.current;
    const previewAreaRect = previewArea.getBoundingClientRect();

    const maxWidth = previewAreaRect.width - 100;
    const maxHeight = previewAreaRect.height - 100;

    const randomX = Math.random() * maxWidth;
    const randomY = Math.random() * maxHeight;

    const newPosition = { x: randomX, y: randomY };
    setPosition(newPosition);
    setMoveHistory((prevHistory) => [
      ...prevHistory,
      { type: "move", position: newPosition },
    ]);
  };

  const glideToRandomPosition = (duration) => {
    setIsGlide(true);
    setDuration(duration);

    const previewAreaWidth = window.innerWidth / 3;
    const previewAreaHeight = window.innerHeight;

    const randomX = Math.random() * (previewAreaWidth - 100);
    const randomY = Math.random() * (previewAreaHeight - 100);

    const newPosition = { x: randomX, y: randomY };
    setPosition(newPosition);
    setMoveHistory((prevHistory) => [
      ...prevHistory,
      { type: "glide", position: newPosition, duration },
    ]);
  };

  const handlePointInDirection = () => {
    const direction = 0;
    setRotation(direction);
    setMoveHistory((prevHistory) => [
      ...prevHistory,
      { type: "rotate", rotation: direction },
    ]);
  };

  const handleClickHello = (text) => {
    setPopoverVisible(true);
    setText("Hello");
  };
  const handleClickHmm = (text) => {
    setPopoverVisible(true);
    setText("Hmm...");
  };

  const handleClickHellofor2sec = (text) => {
    setPopoverVisible(true);
    setText("Hello");
    setTimeout(() => {
      setPopoverVisible(false);
      setText("");
    }, 2000);
  };
  const handleClickHmmfor2sec = (text) => {
    setPopoverVisible(true);
    setText("Hmm...");
    setTimeout(() => {
      setPopoverVisible(false);
      setText("");
    }, 2000);
  };

  const replayMoves = () => {
    moveHistory.forEach((move, index) => {
      setTimeout(() => {
        if (move.type === "move" || move.type === "glide") {
          setPosition(move.position);
        } else if (move.type === "rotate") {
          handlePointInDirection();
          setRotation(move.rotation);
        }
      }, index * 1000);
    });
  };

  const showCharacter = () => {
    setShow(true);
  };

  const hideCharacter = () => {
    setShow(false);
  };

  // const handleDrop = (item) => {
  //   const parsedItem = JSON.parse(item);
  //   setDroppedItems((prevItems) => [...prevItems, parsedItem]);
  // };
  // const handleExecute = (onClick) => {
  //   if (typeof onClick === "function") {
  //     onClick();
  //   }
  // };
  const handleDrop = (item) => {
    const parsedItem = JSON.parse(item);
    setDroppedItems((prevItems) => [...prevItems, parsedItem]);
  };

  const actionMap = {
    moveCat,
    rotateCatCounterclockwise,
    rotateCat,
    goToRandomPosition,
    glideToRandomPosition,
    handlePointInDirection,
    replayMoves,
    showCharacter,
    hideCharacter,
    handleClickHello,
    handleClickHellofor2sec,
    handleClickHmm,
    handleClickHmmfor2sec,
  };

  const handleExecute = (action) => {
    if (actionMap[action]) {
      actionMap[action]();
    }
  };

  return (
    <div className="bg-blue-100 pt-6 font-sans">
      <div className="h-screen overflow-hidden flex flex-row">
        <div className="flex-1 h-screen overflow-hidden flex flex-row bg-white border-t border-r border-gray-200 rounded-tr-xl mr-2">
          <Sidebar
            moveCat={moveCat}
            rotateCat={rotateCat}
            rotateCatCounterclockwise={rotateCatCounterclockwise}
            goToRandomPosition={goToRandomPosition}
            glideToRandomPosition={glideToRandomPosition}
            pointInDirection={handlePointInDirection}
            // handleClick={handleClick}
            handleClickHello={handleClickHello}
            handleClickHmm={handleClickHmm}
            handleClickHellofor2sec={handleClickHellofor2sec}
            handleClickHmmfor2sec={handleClickHmmfor2sec}
            replayMoves={replayMoves}
            showCharacter={showCharacter}
            hideCharacter={hideCharacter}
            // handleClickfor2sec={handleClickfor2sec}
            onDrop={handleDrop}
            handleExecute={handleExecute}
          />
          <MidArea
            droppedItems={droppedItems}
            onDrop={handleDrop}
            handleExecute={handleExecute}
          />
        </div>
        <div
          className="w-1/3 h-screen overflow-hidden flex flex-row bg-white border-t border-l border-gray-200 rounded-tl-xl ml-2 preview-area"
          ref={previewAreaRef}
        >
          {show ? (
            <PreviewArea
              position={position}
              setPosition={setPosition}
              rotation={rotation}
              isGlide={isGlide}
              duration={duration}
              popoverVisible={popoverVisible}
              setPopoverVisible={setPopoverVisible}
              popoverPosition={popoverPosition}
              setPopoverPosition={setPopoverPosition}
              previewAreaRef={previewAreaRef}
              text={text}
              setText={setText}
              show={show}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}
