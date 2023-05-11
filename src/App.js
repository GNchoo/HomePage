import { BrowserRouter, Route } from "react-router-dom";

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Routes from "./config/path";

function App() {
  return (
    <BrowserRouter>
      <>
        <Header />
        <Routes>
          <Route component={Routes} />
        </Routes>
        <Footer />
      </>
    </BrowserRouter>
  );
}

export default App;
