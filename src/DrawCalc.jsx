import React from "react";
const DrawCalc = ({calcBtns, setClickedBtn, dispTotalValue, dispValue, userMessage, memoryData}) => {
      
  const onButtonClick = btn => setClickedBtn(btn);
  const mVal = memoryData ? "M" : "";
  return (
        <div className="mx-auto w-2/5">
            <h1 className="text-center text-3xl p-5 font-bold text-red-400 underline">My Calculator</h1>
            
            <div className='grid text-center grid-cols-4 grid-rows-3 rounded
                            border-gray-700 pb-0 border-2 
                            border-b-0 rounded-b-none bg-gray-700'>

                        <div className="flex items-center justify-center m-0.5 my-1 gap-0 text-2xl  
                                        border-0  uppercase text-red-600 bg-lime-100 
                                        rounded-md font-bold">{mVal} </div>

                        <div className="m-1 col-start-2 row-span-2 col-span-3
                               border-0 border-gray-700 text-2xl text-right pr-3  
                               text-black bg-white rounded-md">{dispTotalValue.toLocaleString("en-IN")}</div>

                        <div className="flex items-center justify-center m-0.5 my-1 gap-0
                                        col-start-1 row-span-1 border-0 text-center uppercase text-xs 
                                        text-red-600 opacity-50  bg-lime-100 rounded-md font-extralight">{memoryData ||"0"} </div>


                        <div className="flex items-center justify-center   m-1 gap-0  row-start-3 col-span-4 h-14
                                 bg-amber-200 text-2xl font-semibold border-0  
                                 text-black rounded-md text-center ">{dispValue || "0"}</div>

            </div>
            <div className='grid text-center grid-cols-4 border-2
                            rounded rounded-t-none border-t-0 border-gray-800 gap-1 pb-0
                            bg-gray-700'>
                {calcBtns.map(i => <button key={i.id}
                                    onClick={()=>onButtonClick(i)}  
                                    className={`h-8 flex item-center justify-center text-lg font-medium rounded m-0.5
                                    bg-amber-100 text-black hover:font-semibold hover:text-2xl hover:cursor-pointer
                                   hover:bg-red-700 hover:text-white`}> 
                              {i.btnText} </button>
                              )}
            </div>
            <div className="text-center text-base italic mt-2 p-2 font-bold text-red-400
                            border-2 border-dashed border-gray-600 rounded-md  ">{userMessage}</div>
      </div> 
      );
    }
 
export default DrawCalc;


 /*
    const calcBtns = [
        {btnText:"MC", id: 1,  btnClass: "data-memory", btnDispOrder: "1",   btnType: "memory-clear"},
        {btnText:"M+", id: 2,  btnClass: "data-memory", btnDispOrder: "2",   btnType: "memory-add"},
        {btnText:"M-", id: 3,  btnClass: "data-memory", btnDispOrder: "3",   btnType: "memory-minus"},
        {btnText:"MR", id: 4,  btnClass: "data-memory", btnDispOrder: "4",   btnType: "memory-show"},
        {btnText:"AC", id: 5,  btnClass: "data-all-clear", btnDispOrder: "5",   btnType: "clearAll"},
        {btnText:"()", id: 6,  btnClass: "data-other", btnDispOrder: "6",   btnType: "paranthesis"},
        {btnText:"%",  id: 7,  btnClass: "data-other", btnDispOrder: "7",   btnType: "percentSign"},
        {btnText:"÷",  id: 8,  btnClass: "data-operation", btnDispOrder: "8",   btnType: "operation"},
        {btnText:"7",  id: 9,  btnClass: "data-number", btnDispOrder: "9",   btnType: "number"},
        {btnText:"8",  id: 10, btnClass: "data-number", btnDispOrder: "10",  btnType: "number"},
        {btnText:"9",  id: 11, btnClass: "data-number", btnDispOrder: "11",  btnType: "number"},
        {btnText:"x",  id: 12, btnClass: "data-operation", btnDispOrder: "12",  btnType: "operation"},
        {btnText:"4",  id: 13, btnClass: "data-number", btnDispOrder: "13",  btnType: "number"},
        {btnText:"5",  id: 14, btnClass: "data-number", btnDispOrder: "14",  btnType: "number"},
        {btnText:"6",  id: 15, btnClass: "data-number", btnDispOrder: "15",  btnType: "number"},
        {btnText:"-",  id: 16, btnClass: "data-operation", btnDispOrder: "16",  btnType: "operation"},
        {btnText:"1",  id: 17, btnClass: "data-number", btnDispOrder: "17",  btnType: "number"},
        {btnText:"2",  id: 18, btnClass: "data-number", btnDispOrder: "18",  btnType: "number"},
        {btnText:"3",  id: 19, btnClass: "data-number", btnDispOrder: "19",  btnType: "number"},
        {btnText:"+",  id: 20, btnClass: "data-operation", btnDispOrder: "20",  btnType: "operation"},
        {btnText:"+/-",id: 21, btnClass: "data-other", btnDispOrder: "21",  btnType: "negate-sign"},
        {btnText:"0",  id: 22, btnClass: "data-number", btnDispOrder: "22",  btnType: "number"},
        {btnText:".",  id: 23, btnClass: "data-number", btnDispOrder: "23",  btnType: "decimal-point"},
        {btnText:"=",  id: 24, btnClass: "data-equals", btnDispOrder: "24",  btnType: "equal-sign"}
        ];
*/
 