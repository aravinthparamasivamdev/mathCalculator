import React from "react";
import styled from "styled-components";

const InputGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 1rem;
`;

const VariableInput = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  label {
    margin-bottom: 0.5rem;
    font-weight: bold;
  }
  input {
    width: 80%;
    padding: 0.5rem;
    border: 1px solid ${(props) => props.theme.colors.primary};
    border-radius: 4px;
  }
`;

function VariableInputs({ variables, onVariableChange }) {
  return (
    <InputGrid>
      {Object.keys(variables).map((key) => (
        <VariableInput key={key}>
          <label>{key}</label>
          <input
            type="number"
            value={variables[key]}
            onChange={(e) => onVariableChange(key, e.target.value)}
          />
        </VariableInput>
      ))}
    </InputGrid>
  );
}

export default VariableInputs;