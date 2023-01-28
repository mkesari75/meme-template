import React from "react";
import { useState } from "react";
import Draggable from "react-draggable";
import styled from "styled-components";

const Input = styled.input`
  width: auto;
  z-index: 3;
  &:focus {
    outline: none;
  }
`;

const Text = () => {
  const [editMode, setEditMode] = useState(false);
  const [value, setValue] = useState("Double click to edit");
  return (
    <Draggable>
      {editMode ? (
        <Input
          onDoubleClick={(e) => setEditMode(false)}
          onKeyPress={(e) => e.key === "Enter" && setEditMode(false)}
          value={value}
          autoFocus={true}
          onChange={(e) => setValue(e.target.value)}
        />
      ) : (
        <h4 onDoubleClick={(e) => setEditMode(true)} style={{ cursor: "move" }}>
          {value}
        </h4>
      )}
    </Draggable>
  );
};

export default Text;
