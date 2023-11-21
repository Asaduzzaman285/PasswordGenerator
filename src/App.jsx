import { useEffect, useRef } from "react";
import { useState, useCallback } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [number, setNumber] = useState(false);
  const [characters, setCharacters] = useState(false);
  const [pass, setPass] = useState("");
  const [copied, setCopied] = useState(false);
  const passwordRef = useRef(null);

  const copy =useCallback(()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,999);
    window.navigator.clipboard.writeText(pass)
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  },[pass])

  const passGenerator = useCallback(() => {
    let password = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (number) str += "0123456789";
    if (characters) str += "#$%&'()*+,-./:;<=>?@^_`{|}~";
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length);
      password += str.charAt(char);
    }
    setPass(password);
  }, [length, number, characters]);

  useEffect(() => {
    passGenerator();
  }, [length, number, characters, passGenerator]);

  return (
    <>
      <div className="w-full shadow-lg text-orange-500 bg-gray-700 px-4 my-9 rounded-lg mx-auto max-w-md">
        <h1 className="text-center text-white mb-4">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4 my-3">
          <input
            type="text"
            placeholder="password"
            readOnly
            value={pass}
           
            className="w-full outline-none py-1 px-3 mb-4 rounded-xl"
            ref={passwordRef}
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 mb-4 rounded"
            onClick={copy}  
          >
            Copy
          </button>
        </div>
        {copied && (
          <div className="text-center text-green-500 mb-2">
            Password copied!
          </div>
        )}
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center mb-3 gap-x-1">
            <input
              type="range"
              min={6}
              max={50}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label>length:{length}</label>
          </div>
          <div className="flex text-sm mb-3 gap-x-1">
            <input
              type="checkbox"
              defaultChecked={number}
              id="numberinput"
              onChange={() => {
                setNumber((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex text-sm mb-3 gap-x-1">
            <input
              type="checkbox"
              defaultChecked={characters}
              id="charecterinput"
              onChange={() => {
                setCharacters((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
