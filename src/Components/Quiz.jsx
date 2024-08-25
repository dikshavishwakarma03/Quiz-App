import React, { useRef, useState } from 'react'
import AllQuestions from "./Data.json"

const Quiz = () => {
    let[index,setIndex]=useState(0);
    let[que,setQue]=useState(AllQuestions[index]);
    let[lock,setLock]=useState(false);
    let[score,setScore]=useState(0);
    let[result,setResult]=useState(false)
    let{question,option1,option2,option3,option4,ans}=que;

    let o1=useRef(null);
    let o2=useRef(null);
    let o3=useRef(null);
    let o4=useRef(null);

    let all_opt=[o1,o2,o3,o4];

    let checkAns = (e,answer)=>{
        if(lock===false){
            if(ans===answer){
                e.target.classList.add("correct");
                setLock(true);  
                setScore((p)=> p + 1);
            }
            else{
                e.target.classList.add("wrong");
                setLock(true);
                all_opt[ans-1].current.classList.add("correct");
            }
        }
    };
    let nextFn=()=>{
      if(lock){
        if(index === AllQuestions.length-1){
          setResult(true)
          return 0;
        }
        setIndex(++index);
        setQue(AllQuestions[index]);
        setLock(false);
        all_opt.map((v)=>{
          v.current.classList.remove("correct");
          v.current.classList.remove("wrong");
          return null;
        })
     }
    }
  return (
    <div>
      <div className='container'>
        <h1>QUIZ APP</h1>
        <hr/>
       {result ?(
        <>
        <h1 className='score'>
          Your score is {score} out of {AllQuestions.length}
       </h1>
        </>
       ) :(
        <>
        <h1>{index+1}.{question}
        </h1>
        <ul>
        <li ref={o1} onClick={(e)=>checkAns(e,1)}>{option1}</li>
         <li ref={o2} onClick={(e)=>checkAns(e,2)}>{option2}</li>
         <li ref={o3} onClick={(e)=>checkAns(e,3)}>{option3}</li>
         <li ref={o4} onClick={(e)=>checkAns(e,4)}>{option4}</li>
         </ul>
         <button type='button' onClick={(e)=>nextFn()}>Next</button>
         <p>
            {index+1} out of {AllQuestions.length}
         </p>
        </>
       )}
      </div>
    </div>
  )
}

export default Quiz;
