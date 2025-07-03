import "./styles.css";
import React, { useState } from "react";

const nominals = [50, 100, 200, 500, 1000, 2000, 5000];

function atm(amount: number, nominals: number[]): string[] {
  let result:string[] = [];
  nominals.sort((a, b) => b - a);

  for (let i = 0; i < nominals.length; i++) {
    let note = nominals[i];
    let count = Math.floor(amount / note);
    if (count > 0) {
      result.push(`${count}x${note}`);
      amount -= count * note;
    }
  }

  return result;
}

export default function App() {
  const [amount, setAmount] = useState(0);
  const [result, setResult] = useState<string[]>([]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(e.target.value));
  };

  const handleSubmit = () => {
    let res = atm(amount, nominals);
    setResult(res);
  };
  return (
    <form>
      <input type="number" value={amount} onChange={handleChange} />
      <button onClick={handleSubmit}> getAtm</button>
      <div>Result</div>
      <ul>
        {result.map((el:string, idx:number) => (
          <li key={idx}>{el}</li>
        ))}
      </ul>
    </form>
  );
}
