import React, { useRef, useState } from "react";
import Sidebar from "./components/Sidebar";
import MidArea from "./components/MidArea";
import PreviewArea from "./components/PreviewArea";

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
    const previewAreaWidth = window.innerWidth / 3;
    const previewAreaHeight = window.innerHeight;

    const randomX = Math.random() * (previewAreaWidth - 100);
    const randomY = Math.random() * (previewAreaHeight - 100);

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

  const handlePointInDirection = (direction) => {
    setRotation(direction);
    setMoveHistory((prevHistory) => [
      ...prevHistory,
      { type: "rotate", rotation: direction },
    ]);
  };

  const handleClick = (text) => {
    setPopoverVisible(true);
    setText(text);
  };
  const handleClickfor2sec = (text) => {
    setPopoverVisible(true);
    setText(text);
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
          setRotation(move.rotation);
        }
      }, index * 1000); // Adjust timing as needed
    });
  };

  const showCharacter = () => {
    setShow(true);
  };
  const hideCharacter = () => {
    setShow(false);
  };

  return (
    <div className="bg-blue-100 pt-6 font-sans">
      <div className="h-screen overflow-hidden flex flex-row  ">
        <div className="flex-1 h-screen overflow-hidden flex flex-row bg-white border-t border-r border-gray-200 rounded-tr-xl mr-2">
          <Sidebar
            moveCat={moveCat}
            rotateCat={rotateCat}
            rotateCatCounterclockwise={rotateCatCounterclockwise}
            goToRandomPosition={goToRandomPosition}
            glideToRandomPosition={glideToRandomPosition}
            pointInDirection={handlePointInDirection}
            handleClick={handleClick}
            replayMoves={replayMoves}
            showCharacter={showCharacter}
            hideCharacter={hideCharacter}
            handleClickfor2sec={handleClickfor2sec}
          />
          <MidArea />
        </div>
        <div className="w-1/3 h-screen overflow-hidden flex flex-row bg-white border-t border-l border-gray-200 rounded-tl-xl ml-2">
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
