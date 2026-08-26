
// import { Route, Routes } from 'react-router-dom';
import MainLayout from './components/Layouts/MainLayout';
import TableStudent from './components/Layouts/TableStudent';
;
// 1. Khai báo kiểu dữ liệu cho 1 Student
// interface Student {
//   key: string;
//   id: string;
//   name: string;
//   age: number;
//   address: string;
// }

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
    <MainLayout>
      {/* <Routes> */}
      {/* <Route path="/homepage" element={<TableStudent />} /> */}
      {/* <Route path="/quan-ly" element={<TableStudent />} />
      </Routes> */}
      <TableStudent />
    </MainLayout>
  );
};

export default App;
