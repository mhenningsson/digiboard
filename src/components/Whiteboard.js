import React, { useRef, useState } from "react";
import Canvas from "./Canvas";
import ToolPicker from "./ToolPicker";
import { jsPDF } from "jspdf";

const Whiteboard = ({ channelName, showInviteUsers, setShowInviteUsers }) => {
  const parentRef = useRef(null);
  const canvasRef = useRef(null);
  const [color, setColor] = useState("#000000");
  const [clearTheCanvas, setClearTheCanvas] = useState(false);

  const handleDownloadCanvas = () => {
    const imgData = canvasRef.current.toDataURL("image/png", 1.0);
    const pdf = new jsPDF("l", "px", "a4");
    pdf.addImage(imgData, "PNG", 0, 0, 500, 500);
    pdf.save("sample-file.pdf");
  };

  return (
    <div id="whiteboard-wrapper" ref={parentRef}>
      <ToolPicker
        color={color}
        setColor={setColor}
        channelName={channelName}
        setClearTheCanvas={setClearTheCanvas}
        showInviteUsers={showInviteUsers}
        setShowInviteUsers={setShowInviteUsers}
        handleDownloadCanvas={handleDownloadCanvas}
      />
      <Canvas
        parentRef={parentRef}
        canvasRef={canvasRef}
        color={color}
        channelName={channelName}
        clearTheCanvas={clearTheCanvas}
        setClearTheCanvas={setClearTheCanvas}
      />
    </div>
  );
};

export default Whiteboard;
