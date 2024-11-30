import React, { useEffect, useState } from "react";
import FormulaInput from "./components/FormulaInput";
import LatexRenderer from "./components/LatexRenderer";
import VariableInputs from "./components/VariableInputs";
import ResultDisplay from "./components/ResultDisplay";
import FormulaHistory from "./components/FormulaHistory";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./styles/GlobalStyles";
import { theme } from "./styles/Theme";
import { evaluateFormula, extractVariables,filterVariable,evaluateTrigonometric } from "./utils/parser";


function App() {
  const [formula, setFormula] = useState("");
  const [variables, setVariables] = useState({});
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  

  const handleFormulaChange = (newFormula) => {
    setFormula(newFormula)
    const trigAndLogRegex = /\b(sin|cos|tan|cot|sec|csc|log|ln)\b/;
    const istrigAndLog = trigAndLogRegex.test(newFormula);
    if(istrigAndLog) {
      setVariables({});
      let filter = filterVariable(newFormula);
      let obj = {};
      filter.forEach((ele) => {
        obj[ele] = 0;
      })
      console.log("obj",obj)
      setVariables(obj);
      for(const key in obj) {
        handleVariableChange(key,obj[key],newFormula)
      }
    }
    else {
      const vars = extractVariables(newFormula);
      const initialValues = vars.reduce((acc, variable) => {
      acc[variable] = 0;
      return acc;
      }, {});
      setVariables(initialValues);
      for(const key in initialValues) {
        handleVariableChange(key,initialValues[key],newFormula)
      }
    }
    
  };
  
  
  
  const handleVariableChange = (name, value) => {
      setVariables((prev) => ({ ...prev, [name]: parseFloat(value) || 0 }));
  };

  useEffect(()=>{
    calculateResult();
  },[formula,variables])

  const calculateResult = () => {
    try {
      const trigAndLogRegex = /\b(sin|cos|tan|cot|sec|csc|log|ln)\b/;
      const istrigAndLog = trigAndLogRegex.test(formula);
      if(istrigAndLog) {
        const computedResult = evaluateTrigonometric(formula, variables);
        setResult(computedResult);
      }
      else {
        const computedResult = evaluateFormula(formula, variables);
        setResult(computedResult);
      }
      
    } catch (err) {
      setResult("Invalid Formula");
    }
  };

  useEffect(() => {
    const calcHistory = JSON.parse(localStorage.getItem('savedFormula')) || [];
    setHistory(calcHistory);
  },[])
  const saveFormula = () => {
    if(formula){
      if(Array.isArray(history)){
        const arr =  [...history, { formula, result }];
        console.log(history);
        
        localStorage.setItem("savedFormula",JSON.stringify(arr));
        setHistory(arr);
      }
    }
  };


  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <div className="app"> 
      <div className="calculator">
        <header>
          <h1>Dynamic Formula Calculator</h1>
        </header>
        <main>
          <LatexRenderer formula={formula} />
          <FormulaInput onChange={handleFormulaChange} />
          <VariableInputs variables={variables} onVariableChange={handleVariableChange} />
          <ResultDisplay result={result} />
          <button className="save-button" onClick={saveFormula}>
            Save Formula
          </button>
          <FormulaHistory history={history} />
        </main>
      </div>
      </div>
    </ThemeProvider>
  );
}

export default App;