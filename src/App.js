import { useState } from 'react';
import './index.scss';

function App() {
  const [count, setCount] = useState(0);

  const handlerPlus = () => setCount(count + 1);


  const handlerMinus = () => setCount(count - 1);


  return (
    <div className="App">
      <div>
        <h2>Счетчик:</h2>
        <h1>{count}</h1>
        <button onClick={handlerMinus} className="minus">- Минус</button>
        <button onClick={handlerPlus} className="plus">Плюс +</button>
      </div>
    </div>
  );
}

export default App;
