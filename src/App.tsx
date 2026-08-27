
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainLayout from './components/Layouts/MainLayout';
import Home from './Page/HomePage';
import Management from './Page/Management';
const App: React.FC = () => {
  return (
    <BrowserRouter >
      <MainLayout >
        <Routes>
          <Route
            path="/trang-chu"
            element={<Home />}
          />
          <Route
            path="/quan-ly"
            element={<Management />}
          />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
};
export default App;
