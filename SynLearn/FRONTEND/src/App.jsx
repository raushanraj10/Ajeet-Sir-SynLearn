import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppStore from "./Utils/Appstore";
import BASE from "./Components/Base";


function App() {
  return (
     <Provider store={AppStore}>
      <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<BASE />} />
      </Routes>
    </BrowserRouter>
   </Provider>
  )
}

export default App
