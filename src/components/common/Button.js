import React from "react";

function Button({ clickFunc = () => {} }) {
  return (
    <React.Fragment>
      <button
        onClick={() => {
          clickFunc();
        }}
      >
        Delete
      </button>
    </React.Fragment>
  );
}

export default Button;
