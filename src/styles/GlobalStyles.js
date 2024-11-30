import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  body {
    
    font-family: 'Arial', sans-serif;
    margin: 0;
    padding: 0;
    background-color: ${(props) => props.theme.colors.background};
    color: ${(props) => props.theme.colors.text};
  }
  .app {
   width: 100%;
   display:flex;
   justify-content: center;
   align-items: center; 
  }
  .calculator {
    max-width: 800px;
    margin: 2rem auto;
    padding: 2rem;
    background: ${(props) => props.theme.colors.card};
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
    

  button.save-button {
    margin-top: 1rem;
    padding: 0.8rem 1.2rem;
    background: ${(props) => props.theme.colors.accent};
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background 0.3s;
    &:hover {
      background: ${(props) => props.theme.colors.accentHover};
    }
  }
`;