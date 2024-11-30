import React from "react";
import styled from "styled-components";

const ResultWrapper = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  background: ${(props) => props.theme.colors.resultBackground};
  color: ${(props) => props.theme.colors.text};
  font-size: 1.5rem;
  text-align: center;
  border-radius: 8px;
`;

function ResultDisplay({ result }) {
  return <ResultWrapper>Result: {result}</ResultWrapper>;
}

export default ResultDisplay;