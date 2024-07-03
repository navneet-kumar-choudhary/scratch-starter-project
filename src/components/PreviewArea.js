import React, { useEffect, useState } from "react";
import CatSprite from "./CatSprite";

export default function PreviewArea({
  position,
  rotation,
  isGlide,
  duration,
  setPosition,
  popoverVisible,
  setPopoverVisible,
  popoverPosition,
  setPopoverPosition,
  previewAreaRef,
  text,
  setText,
  show,
}) {
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [containerDimensions, setContainerDimensions] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const updateDimensions = () => {
      if (previewAreaRef.current) {
        const rect = previewAreaRef.current.getBoundingClientRect();
        setContainerDimensions({ width: rect.width, height: rect.height });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const handleMouseDown = (e) => {
    const rect = previewAreaRef.current.getBoundingClientRect();
    setDragging(true);
    setOffset({
      x: e.clientX - rect.left - position.x,
      y: e.clientY - rect.top - position.y,
    });
    setPopoverVisible(false); // Hide the popover when starting to drag
  };

  const handleMouseMove = (e) => {
    if (dragging) {
      const rect = previewAreaRef.current.getBoundingClientRect();
      let x = e.clientX - rect.left - offset.x;
      let y = e.clientY - rect.top - offset.y;

      const maxWidth = containerDimensions.width - 100;
      const maxHeight = containerDimensions.height - 100;

      if (x < 0) x = 0;
      if (x > maxWidth) x = maxWidth;
      if (y < 0) y = 0;
      if (y > maxHeight) y = maxHeight;

      setPosition({ x, y });
    }
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  return (
    <div
      className="flex-none h-full overflow-y-auto w-full relative"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      ref={previewAreaRef}
    >
      <div
        style={{
          position: "absolute",
          cursor: "pointer",
          left: position.x,
          top: position.y,
        }}
        onMouseDown={handleMouseDown}
      >
        <CatSprite
          position={position}
          rotation={rotation}
          isGlide={isGlide}
          duration={duration}
        />
      </div>
      {popoverVisible && (
        <div
          style={{
            position: "absolute",
            left: position.x + 200,
            top: position.y + 50,
            background: "white",
            border: "1px solid gray",
            borderRadius: "4px",
            padding: "8px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
          }}
        >
          {text}
        </div>
      )}
    </div>
  );
}
