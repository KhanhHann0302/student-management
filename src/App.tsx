
// import { Route, Routes } from 'react-router-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainLayout from './components/Layouts/MainLayout';
// import TableStudent from './components/Layouts/TableStudent';
import Home from './Page/HomePage';
import Management from './Page/Management';
// 2. Định nghĩa cấu hình các Cột 
// const columns: ColumnsType<Student> = [
//   {
//     title: 'ID',
//     dataIndex: 'id',
//     key: 'id',
//   },
//   {
//     title: 'Tên',
//     dataIndex: 'name',
//     key: 'name',
//     render: (text: string) => <a>{text}</a>,
//   },
//   {
//     title: 'Tuổi',
//     dataIndex: 'age',
//     key: 'age',
//   },
//   {
//     title: 'Địa chỉ',
//     dataIndex: 'address',
//     key: 'address',
//   },
// ];
// const [open, setOpen] = useState(false); // khai báo state để điều khiển Modal
// 3. Khai báo state chứa DỮ LIỆU học sinh
// const [students, setStudents] = useState<Student[]>([
//   {
//     key: '1',
//     id: 'SV001',
//     name: 'Nguyễn Văn A',
//     age: 20,
//     address: 'Hà Nội',
//   },
//   {
//     key: '2',
//     id: 'SV002',
//     name: 'Trần Thị B',
//     age: 21,
//     address: 'TP.HCM',
//   },
// ]);
const App: React.FC = () => {
  return (
    <BrowserRouter>
      <MainLayout>
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
