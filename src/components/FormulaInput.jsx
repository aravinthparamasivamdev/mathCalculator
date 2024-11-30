import React from "react";
import styled from "styled-components";

const InputWrapper = styled.div`
  margin: 1rem 0;
  input {
    width: 100%;
    padding: 0.8rem;
    font-size: 1.1rem;
    border: 2px solid ${(props) => props.theme.colors.primary};
    border-radius: 8px;
    outline: none;
    transition: border-color 0.3s;
    &:focus {
      border-color: ${(props) => props.theme.colors.accent};
    }
  }
`;

function FormulaInput({ onChange }) {
  const handleChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <InputWrapper>
      <input type="text" placeholder="Enter formula (e.g., sin(a) + log(b))" onChange={handleChange} />
    </InputWrapper>
  );
}

export default FormulaInput;