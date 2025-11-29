import { BrowserRouter, Route, Routes } from "react-router";
import TreeShowMain from "./components/TreeShowMain";

// import TreeIndexMain from "./components/TreeIndexMain";
import ExplorerMain from "./components/ExplorerMain";
import { useState } from "react";
import type { Info } from "./type/Info";
import Teach from "./components/Teach";

function App() {
  const [convertedInfo2, setConvertedInfo2] = useState<Info>([]);
  const [originalInput, setOriginalInput] = useState<string>("");
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/teach" element={<TreeIndexMain info={convertedInfo}/>}></Route> */}
        <Route path="/teach" element={<Teach setInfo={setConvertedInfo2} setOriginalInput={setOriginalInput}/>}></Route>
        <Route path="/teach/trees" element={<TreeShowMain setInfo={setConvertedInfo2} setOriginalInput={setOriginalInput} info={convertedInfo2} originalInput={originalInput}/>}></Route>
        <Route path="/teach/explore" element={<ExplorerMain setInfo={setConvertedInfo2} setOriginalInput={setOriginalInput} info={convertedInfo2} originalInput={originalInput}/>}></Route>
      </Routes>
      <p>© 2025, <a href="https://x.com/mugcup55929" target="_blank">Kurihara Kazuya</a></p>
    </BrowserRouter>
  )
}

export default App
