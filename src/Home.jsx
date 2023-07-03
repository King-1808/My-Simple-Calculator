import DrawCalc from "./DrawCalc";
import useFetch from "./useFetch";
import { useState } from 'react';

const Home = () => {

    const { error, isPending, data: calcBtns }  = useFetch('http://localhost:8000/calcDisplayData');
    const [memoryData, setMemoryData]           = useState(''); 
    const [dispTotalValue, setDispTotalValue]   = useState('0');
    const [dispValue  , setDispValue  ]         = useState('');
    const [userMessage, setUserMessage ]        = useState('use calculator ...');
    const [curValue  , setCurValue  ]           = useState('');
    const [totalValue, setTotalValue]           = useState('');
    
    const [toggleBrackets, setToggleBrackets ]  = useState(true);
    const [currentOperand , setCurrentOperand]  = useState('');
    const [previousOperand, setPreviousOperand] = useState(''); 
    const [operation     , setOperation]        = useState('');    

    let clickedBtn = {btnText:'', id: '', btnClass: '', btnDispOrder:'', btnType: ''};

    const calcOperations = ['+', '÷', '%', 'x', '-'];
    const calcNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    const bracketSet = '()';
    

    const handleCurValue      = (e) =>{
          let dispE = e.toString().replaceAll('/', '÷');
          dispE = dispE.replaceAll('*', 'x');
              
          setCurValue(prev => e);
          setDispValue(prev => dispE);
    }
    const handleTotalValue    = (e) => {
          setTotalValue(() => e);
          if (!e) setDispTotalValue(prev => "0"); else setDispTotalValue(prev => e);
    }
    const handleUserMessage   = (e) => setUserMessage(prev => e);
    const handleToggleBrackets= (e) => setToggleBrackets(prev => !prev);    
    const handleMemoryData    = (e) => setMemoryData(prev => e);

  const resetVal =  (e)=> {
      handleCurValue(e);
      handleTotalValue(e);
    }
    
    const clearVal =  ()=> {
      handleCurValue('');
      handleTotalValue('');
    }

    const computeVal = (cVal, srcCall) =>  {
      let tBr = toggleBrackets;
      let userInput = cVal;   
      let nVal;
      try {
      nVal  = Function("return " + userInput)();
        }  catch (e) { return }  

      //if (tBr)
        handleTotalValue(nVal);
                if (srcCall==='EQL') handleCurValue(nVal);
    }

    const deleteVal = () => {
        let cVal = curValue.toString().slice(0, -1);
        let lastEntry = curValue.toString().slice(-1);
        let tBr = toggleBrackets;
        let secondLastEntry='0';
  
        if (cVal.length > 0) secondLastEntry = cVal.toString().slice(-1);

        handleCurValue(cVal);

        if (lastEntry == ')') {
            handleToggleBrackets();
        }
          else if (tBr) {
                   if (calcOperations.includes(lastEntry) || 
                      calcNumbers.includes(secondLastEntry) )       
                      computeVal(cVal, 'DLV');
          } else if (lastEntry == '(') 
            {          
               if (cVal.length === 0) computeVal(cVal, 'DLV');
               handleToggleBrackets();
            }
    }

    const  appendNumber = (clickedBtnValue) => {
        let cVal = curValue.toString();

        if (clickedBtnValue === '.' && cVal.includes('.')) return
        if (cVal==='0' && clickedBtnValue === '0' ) return
        if (cVal.length > 35) {
              handleUserMessage('Cannot handle more unput...');
              return;
        }
        cVal = cVal + clickedBtnValue.toString();
        if (cVal ==='.') cVal = "0.";
        handleCurValue(cVal);
        computeVal(cVal, 'APN');
    }

    const chooseOperation= (operation) => {
        let lastEntry = curValue.toString().slice(-1);
        let cVal = curValue.toString().slice(0,-1)+operation;

        if ( operation != '-' && 
             (curValue === ''  || lastEntry =="(") )
        {     
              handleUserMessage('Cannot enter an operation here ...');
               return
       }
        
        if  (calcOperations.includes(lastEntry)) {
                handleCurValue(cVal);
               return 
       } 
      
       handleCurValue(curValue+operation);
   }

    const manageMemory = (operation) => {
        let tVal = +totalValue;
        let mVal = +memoryData;
        let lastEntry = curValue.toString().slice(-1);
        let cVal  = curValue.toString();

        if ( operation === 'MR' )
            {
              if (curValue.toString() === '' ||  calcOperations.includes(lastEntry)) 
                  appendNumber(mVal);
              else {
                  mVal = '+('+mVal+')';
                  appendNumber(mVal);
              }
                  // resetVal(mVal);
            } 
              else if ( operation === 'MC' )
              {      
                handleMemoryData(0);
              } 
                else if ( operation === 'M+' )
                {     
                  mVal += +totalValue;                 
                  handleMemoryData(mVal);
                } 
                  else if ( operation === 'M-' )
                {
                  mVal -= +totalValue;
                  handleMemoryData(mVal);
                }
    }

   const equalsOp = () =>  {
        let cVal = curValue.toString();
        let tBr = toggleBrackets;
        let lastEntry = curValue.toString().slice(-1); 

        if (tBr && !calcOperations.includes(lastEntry)) {
          computeVal(cVal, 'EQL'); 
          return true;
        } else if (tBr) {
           handleUserMessage('You need to continue the expression first ...');
          }   else  {
            handleUserMessage('You need to close the brackets in the expression first...');
              } 
        return false;
    }


    const  otherOps = (operation) => {
      let lastEntry ='';
      let tBr = toggleBrackets;
      let cVal='';
      if (curValue!=='') {
          lastEntry = curValue.toString().slice(-1);
          cVal = curValue.toString();
      }
      if (operation == '()') {
          if ((tBr && calcOperations.includes(lastEntry)) ||  curValue==='' )
                cVal += '(' 
      
                else if (tBr && !calcOperations.includes(lastEntry) )
                {
                  cVal += '*(';
                }
                  else if (!tBr && !calcOperations.includes(lastEntry) && !bracketSet.includes(lastEntry))
                        cVal += ')'  
                    else {
                          handleUserMessage('This calculator doesnt handle nested brackets...');
                          return}
             
          handleCurValue( cVal);
          handleToggleBrackets()
          computeVal(cVal, 'BRK');
      }
        else if (operation =='+/-') {
            let nVal;
            if (lastEntry) 
                {
                  if (calcNumbers.includes(lastEntry)) 
                  // nVal = curValue.toString().slice(0,-1) +'-'+lastEntry;
                     nVal = curValue.toString() +'*(-1)';
                  else  
                  {
                     handleUserMessage('Can not toggel the sign excep for numbers entry...');
                     return;
                  }
                  handleCurValue(nVal);
                  computeVal(nVal, 'TGS');
                }
             }
    }

    const manageOperation = ()  =>{
      let e = clickedBtn.btnType;
      let t = clickedBtn.btnText;
      switch (e) {
        case 'data-number': 
            appendNumber(t);
            break;
        case 'data-operation':
              if (t==='÷') t='/'; else if (t==='x') t='*';
              chooseOperation(t);
            break;
        case 'data-delete':
            deleteVal();
            break;
        case 'data-memory':
            manageMemory(t);
            break;
        case 'data-equals': 
            if (equalsOp()) {
                handleCurValue(totalValue);}
            break;
        case 'data-all-clear':
            clearVal();
            break;
        case 'data-other':
            otherOps(t);
            break;
        default:
            return;
      }
 }


    function handleClick (e) 
      {
        clickedBtn.btnText=e.btnText;
        clickedBtn.id=e.id;
        clickedBtn.btnClass=e.btnClass, 
        clickedBtn.btnDispOrder=e.btnDispOrder
        clickedBtn.btnType=e.btnType
        handleUserMessage('use calculator ...');
        manageOperation();
      }

return (
    <div>     
      { error && <div>{ error }</div> }
      { isPending && <div>Loading...</div> }
      { calcBtns &&  <DrawCalc 
                        calcBtns={calcBtns}  
                        setClickedBtn={handleClick}
                        dispTotalValue={dispTotalValue}
                        dispValue ={dispValue}
                        userMessage={userMessage}
                        memoryData={memoryData}
                />} 
   </div>
  );
}
 
export default Home;