import TableStudent from "../components/Layouts/TableStudent";
import TeacherManagement from "../components/Layouts/TeacherManagement";
import { useSearchParams } from "react-router-dom";
const Management = () => {
    const [searchParams] = useSearchParams();
    const activeTab = searchParams.get("tab") || "a1"; //lấy giá trị tham số trên tab. VDU: /quan-ly?tab=a2 => giá trị nhận đc là a2 || a1 nếu biến URL chưa có tab => mặc định a1
    return (
        <div style={{ padding: "16px 0" }}>
            {activeTab === "a1" && <TableStudent />}
            {activeTab === "a2" && <TeacherManagement />}
            {activeTab === "a3" && <div>Giao diện Quản Lý Tài Khoản</div>}
            {activeTab === "a4" && <div>Giao diện Phân Quyền</div>}
        </div>
    );
};
export default Management;