import React from "react";
import styled from "styled-components";

const HistoryWrapper = styled.div`
  margin-top: 2rem;
  background: ${(props) => props.theme.colors.backgroundLight};
  padding: 1rem;
  border-radius: 8px;
  h2 {
    margin-bottom: 1rem;
  }
`;

const HistoryItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px solid ${(props) => props.theme.colors.primary};
`;

function FormulaHistory({ history }) {
  return (
    <HistoryWrapper>
      <h2>Saved Formulas</h2>
      {history.map((item, index) => (
        <HistoryItem key={index}>
          <span>{item.formula}</span>
          <span>{item.result}</span>
        </HistoryItem>
      ))}
    </HistoryWrapper>
  );
}

export default FormulaHistory;