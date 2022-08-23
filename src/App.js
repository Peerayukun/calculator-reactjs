import {useEffect, useState} from 'react';
import './App.css';

function App() {
  const [cal,setCal] = useState('')
  const [temp,setTemp] = useState('')
  const [allowPlus,setAllowplus] = useState(false)
  const [allowMin,setAllowmin] = useState(true)
  const [allowMul,setAllowmul] = useState(false)
  const [allowDiv,setAllowdiv] = useState(false)
  const [allowDot,setAllowdot] = useState(false)
  const [obj,setObj] = useState(1)
  const [calArr,setCalarr] = useState([0])
  const [operation,setOperation] = useState('+')
  const insert=(x)=>{
    setCal(cal+x)
    let append = calArr
    if (x!=='+'&&x!=='-'&&x!=='*'&&x!=='/'){
      setTemp(temp+x)
      if(operation==='+'){
        append[append.length-1] = Number(temp+x)
      }
      if(operation==='-'){
        append[append.length-1] = -1*Number(temp+x)
      }
      setCalarr(append)
    }
    else{
      setTemp('')
      if(x==='+'||x==='-'){
        if(operation==='*'){
          append[append.length-1] = obj*temp
        }
        if(operation==='/'){
          append[append.length-1] = obj/temp
        }
        setObj(1)
        append.push(0)
      }
      if(x==='*'){
        if(operation==='/'){
          setObj(obj/temp)
        }
        else {
          setObj(obj*temp)
        }
      }
      if(x==='/'){
        if(operation==='/'){
          setObj(obj/temp)
        }
        else{
          setObj(obj*temp)
        }
      }
      setCalarr(append)
      setOperation(x)
    }
  }
  const allClear=()=>{
    setCal('')
    setTemp('')
    setCalarr([0])
    setOperation('+')
    setObj(1)
  }

  const sum=(Array)=>{
    let s=0
    Array.forEach(element => {
      s+=Number(element)
    });
    return s
  }
  const result=()=>{
    let deduct = calArr[calArr.length-1]
    let ans = sum(calArr)
    if(operation==='*'){
      ans = ans-deduct+(obj*temp)
    }
    if(operation==='/'){
      ans = ans-deduct+(obj/temp)
    }
    setCal(String(ans))
    setTemp(String(ans))
    setCalarr([ans])
    setObj(1)
    setOperation('+')
  }
  useEffect(()=>{
    if (cal!==''){
      let x = cal[cal.length-1]
      if (x!=='+'&&x!=='-'&&x!=='*'&&x!=='/'){
          setAllowplus(true)
          setAllowmin(true)
          setAllowmul(true)
          setAllowdiv(true)
          setAllowdot(true)
      }
      else{
        setAllowdot(false)
        setAllowplus(false)
        setAllowmin(false)
        setAllowmul(false)
        setAllowdiv(false)
      }
    }
    else{
      setAllowplus(false)
      setAllowmin(false)
      setAllowmul(false)
      setAllowdiv(false)
      setAllowdot(false)
    }
  },[cal])

  return (
    <div className="App">
      <div>
        <input value={cal} className='form-control' readOnly/>
      </div>
      <div className='Row'>
        <button onClick={allClear} className='btn btn-outline-danger allclear'>AC</button>
        <button onClick={()=>insert('+')} disabled={!allowPlus} className='btn btn-warning'>+</button>
      </div>
      <div className='Row'>
        <button onClick={()=>insert('7')} className='btn btn-secondary'>7</button>
        <button onClick={()=>insert('8')} className='btn btn-secondary'>8</button>
        <button onClick={()=>insert('9')} className='btn btn-secondary'>9</button>
        <button onClick={()=>insert('-')} disabled={!allowMin} className='btn btn-warning'>-</button>
      </div>
      <div className='Row'>
        <button onClick={()=>insert('4')} className='btn btn-secondary'>4</button>
        <button onClick={()=>insert('5')} className='btn btn-secondary'>5</button>
        <button onClick={()=>insert('6')} className='btn btn-secondary'>6</button>
        <button onClick={()=>insert('*')} disabled={!allowMul} className='btn btn-warning'>x</button>
      </div>
      <div className='Row'>
        <button onClick={()=>insert('1')} className='btn btn-secondary'>1</button>
        <button onClick={()=>insert('2')} className='btn btn-secondary'>2</button>
        <button onClick={()=>insert('3')} className='btn btn-secondary'>3</button>
        <button onClick={()=>insert('/')} disabled={!allowDiv} className='btn btn-warning'>/</button>
      </div>
      <div>
        <button onClick={()=>insert('0')} className='btn btn-secondary zero'>0</button>
        <button onClick={()=>insert('.')} disabled={temp.includes('.')?true:(!allowDot)} className='btn btn-secondary'>.</button>
        <button onClick={result} className='btn btn-warning'>=</button>
      </div>
    </div>
  );
}

export default App;
