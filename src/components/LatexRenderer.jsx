import React from "react";
import TeX from "@matejmazur/react-katex";
import "katex/dist/katex.min.css";
import styled from "styled-components";

const RendererWrapper = styled.div`
  background: ${(props) => props.theme.colors.backgroundLight};
  color: ${(props) => props.theme.colors.text};
  padding: 1rem;
  margin-bottom: 1rem;
  font-size: 1.5rem;
  border-radius: 8px;
  text-align: center;
`;

function LatexRenderer({ formula }) {
  const latexString = formula.replace(/\^/g, "^{").replace(/(?<!\\)_/g, "_{").replace(/}/g, "} ");
  console.log("latex",latexString);
  return (
    <RendererWrapper>
      
      <TeX math={latexString}/>

    </RendererWrapper>
  );
}

export default LatexRenderer;