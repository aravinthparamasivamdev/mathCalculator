import { create, all } from "mathjs";

const math = create(all);

export function extractVariables(formula) {
    const arr = formula.split("=")
    if (arr.length > 1) {
        formula = arr[1];
    }
    const matches = formula.match(/[a-zA-Z]/g);
    return matches ? Array.from(new Set(matches)) : [];
}

export function evaluateFormula(formula, variables) {

    const sanitizedFormula = formula.replace(/([a-zA-Z])/g, (match) => `(${variables[match] || 0})`);
    const equalSign = sanitizedFormula.toString().split("").filter((ele) => ele != " ");
    let obj = {};
    if (equalSign[3] != '=') {
        return math.evaluate(sanitizedFormula);
    }
    equalSign.forEach((ele) => {
        if (obj[ele]) {
            obj[ele] += 1;
        }
        else {
            obj[ele] = 1
        }
    })
    if (obj['='] > 1) {
        return math.evaluate(sanitizedFormula);
    }

    const slicedMath = equalSign.slice(4).join("");
    console.log("slicedMath", slicedMath)
    return math.evaluate(slicedMath);


}

export function evaluateTrigonometric(formula, variableValues) {
    console.log("formula", formula);
    console.log("variableValues", variableValues);

    const functionRegex = /\b(sin|cos|tan|cot|sec|csc|log|ln)\(([^)]+)\)\s*([+\-*/^])?/g;

    const supportedFunctions = {
        sin: (x) => Math.sin(x),
        cos: (x) => Math.cos(x),
        tan: (x) => Math.tan(x),
        cot: (x) => 1 / Math.tan(x),
        sec: (x) => 1 / Math.cos(x),
        csc: (x) => 1 / Math.sin(x),
        log: (x, base = 10) => Math.log(x) / Math.log(base),
        ln: Math.log,
    };

    let matches;
    let result = 0;
    let lastOperator = "+";

    while ((matches = functionRegex.exec(formula)) !== null) {
        console.log("matches", matches);
        const funcName = matches[1];
        const argument = matches[2];
        const operator = matches[3] || "*";

        let funcValue;

        if (funcName === "log") {
            const value = evaluateFormula(argument, variableValues);
            funcValue = supportedFunctions[funcName](value);

        }
        else {
            const value = evaluateFormula(argument, variableValues);
            funcValue = supportedFunctions[funcName](value);
            console.log("funcValue", funcValue);
        }

        switch (lastOperator) {
            case "+":
                result += funcValue;
                break;
            case "-":
                result -= funcValue;
                break;
            case "*":
                result *= funcValue;
                break;
            case "/":
                if (funcValue === 0) throw new Error("Division by zero encountered.");
                result /= funcValue;
                break;
            case "^":
                result = Math.pow(result, funcValue);
                break;
            default:
                throw new Error(`Unsupported operator '${lastOperator}'.`);
        }

        lastOperator = operator;
    }

    return result;
};


export function filterVariable(newForm) {
    console.log("newForm", newForm);
    const variableRegex = /\b(?!sin|cos|tan|cot|sec|csc|log|ln\b)[a-zA-Z]+\b/g;
    const variables = newForm.match(variableRegex);
    console.log("variables", variables);
    if (variables) {
        let result = new Array();
        variables.forEach((ele) => {
            result.push(...ele.split(""))
        })
        const set = new Set(result);
        const res = [...set];
        return res;
    }
    return [];

}