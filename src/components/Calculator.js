import { useState, useEffect, useRef} from "react"

// TODOS
    // Fix the order of operands for more precise calculations
    // Use eval alternative, if possible

// BUGS
    // Pressing an expression twice breaks app
    // Pressing and expression first breaks app

export default function Calculator() {
    const [allValues, setAllValues] = useState([]);
    const [expressions, setExpressions] = useState([]);
    const [numbers, setNumbers] = useState([]);

    const runningTotalRef = useRef([0]);
    const sumTotalRef = useRef([0])
    let calcGroupRef = useRef([])
    
    useEffect(() => {
        const input = document.getElementById('screen-input');
        const currentExpression = expressions[expressions.length - 1];
        const previousExpression = expressions[expressions.length - 2];

        //Set up running Total
        if (previousExpression && numbers.length === 0) {
            runningTotalRef.current = eval(calcGroupRef.current[calcGroupRef.current.length - 1]); 
         }

        if (numbers.length === 0) {
            input.value = runningTotalRef.current;
        }

        // Set up Sum total
        if (currentExpression === '=') {
            sumTotalRef.current = eval(calcGroupRef.current[calcGroupRef.current.length - 1]);
            input.value = sumTotalRef.current
        }
        
        // Joins equations and adds to calcGroupRef array
        if (currentExpression !== '=') {
            calcGroupRef.current = [
                ...calcGroupRef.current,
                allValues.join('')
            ]
        }
        
        // Testing
       
        console.log(`all values: ${allValues}`);
        console.log(`numbers: ${numbers}`);
        console.log(`current expression: ${currentExpression}`);
        console.log(`previous expression: ${previousExpression}`);
        console.log(`calcGroupRef: ${calcGroupRef.current}`);
        console.log(`runningTotalRef ${runningTotalRef.current}`);
        console.log(`sumtotalref ${sumTotalRef.current}`);

    })

    function handleClick(e) {   
         const currentValue = e.target.textContent

        //Resets all state upon 'cancel'

        if (currentValue === 'C') {
            setNumbers([])
            setExpressions([])
            setAllValues([])
            runningTotalRef.current = [0]
            sumTotalRef.current = [0]
            calcGroupRef.current = []
            return;
        }

        // Sets all values
 
        if (currentValue !== '=') {
            setAllValues([
                ...allValues,
                currentValue
            ])
        }
        
       // Sets expressions only
  
        if (currentValue === '+' || 
            currentValue === '-' || 
            currentValue === '/' || 
            currentValue === '*' || 
            currentValue === '=' 
        ) {
            setExpressions([
                ...expressions,
                currentValue
            ])
        }
     
        // Sets numbers only
        
        if ((Number(currentValue) >= 0 && Number(currentValue) < 10) || (currentValue === '.'))  {
            setNumbers([
                ...numbers,
                currentValue
            ])
        } 

        // Clears numbers and adds to running total 
  
        if (currentValue === '+' || 
            currentValue === '-' || 
            currentValue === '/' || 
            currentValue === '*' ||
            currentValue === '=' 
        ) {
            runningTotalRef.current = numbers.join('')
            setNumbers([])
        }
    }

    return (
        <div className="calculator-container">

            {/* Screen */}

            <div id="logo"></div>
            <div className="screen">
            </div>
            <input 
                type="text" 
                id="screen-input" 
                value={ 
                    Number(numbers.join('').substring(0, 9)).toLocaleString()
                }
                disabled={true}
            />

            {/* Buttons */}

            <button id="cancel" className="function" onClick={(e) => handleClick(e)}>C</button>
            <button className="decor function"></button>
            <button className="decor function"></button>
            <button id="divide" className="calculate" onClick={(e) => handleClick(e)}>/</button>
            <button id="button-7" className="number" onClick={(e) => handleClick(e)}>7</button>
            <button id="button-8" className="number" onClick={(e) => handleClick(e)}>8</button>
            <button id="button-9" className="number" onClick={(e) => handleClick(e)}>9</button>
            <button id="multiply" className="calculate" onClick={(e) => handleClick(e)}>*</button>
            <button id="button-4" className="number" onClick={(e) => handleClick(e)}>4</button>
            <button id="button-5" className="number"onClick={(e) => handleClick(e)}>5</button>
            <button id="button-6" className="number" onClick={(e) => handleClick(e)}>6</button>
            <button id="minus" className="calculate" onClick={(e) => handleClick(e)}>-</button>
            <button id="button-1" className="number" onClick={(e) => handleClick(e)}>1</button>
            <button id="button-2" className="number" onClick={(e) => handleClick(e)}>2</button>
            <button id="button-3" className="number" onClick={(e) => handleClick(e)}>3</button>
            <button id="add" className="calculate" onClick={(e) => handleClick(e)}>+</button>
            <button id="button-0" className="number" onClick={(e) => handleClick(e)}>0</button>
            <button id="decimal" className="calculate" onClick={(e) => handleClick(e)}>.</button>
            <button id="equals" className="calculate" onClick={(e) => handleClick(e)}>=</button>
        </div>
    )
}