export interface DataType {
    key: string;
    id: string;
    name: string;
    age: number;
    address: string;
    class: string;
    major: string;
    tags: string[];
    gender: boolean;
}
export interface TeacherType {
    key: string;
    id: string;
    name: string;
    age: number;
    email: string;
    phone: string;
    major: string; // Khoa
    academicRank: string; // Học hàm/Học vị (Thạc sĩ, Tiến sĩ, Giáo sư)
    status: boolean; // Đang dạy (true) / Nghỉ dạy (false)
}