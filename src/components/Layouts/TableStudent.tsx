import { Button, Flex, Input, Select, Space, Table, type TableProps, Tag, Col, Row, Popconfirm } from 'antd'; //popconfirm là hộp hỏi xác nhận
import { SearchOutlined, DeleteOutlined } from '@ant-design/icons/es/icons/index';
import React, { useState } from 'react';
import StudentDrawer from "./StudentDrawer";
import type { DataType } from '../../models/Student';
const initialData: DataType[] = [
    {
        key: '1',
        id: 'SV001',
        name: 'Nguyễn Nhật Thành',
        age: 20,
        address: '22 Nguyễn Chí Thanh, Đà Nẵng',
        class: '10A1',
        major: 'Công nghệ thông tin',
        tags: ['Lập trình viên'],
        gender: false,
    },
    {
        key: '2',
        id: 'SV002',
        name: 'Lê Văn Bé',
        age: 20,
        address: '24 Phạm Văn Nghị, Đà Nẵng',
        class: '10A2',
        major: 'Kinh tế',
        tags: ['Kinh Doanh'],
        gender: false,
    },
    {
        key: '3',
        id: 'SV003',
        name: 'Trần Ngọc',
        age: 21,
        address: '26 Trần Phú, Đà Nẵng',
        class: '10A3',
        major: 'Sư phạm',
        tags: ['Giáo viên'],
        gender: true,
    },
];
const TableStudent: React.FC = () => {
    const columns: TableProps<DataType>['columns'] = [
        {
            title: 'Tên',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Tuổi',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Lớp',
            dataIndex: 'class',
            key: 'class',
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Chuyên ngành',
            dataIndex: 'major',
            key: 'major',
        },
        {
            title: 'Ghi Chú',
            key: 'tags',
            dataIndex: 'tags',
            render: (_, { tags }) => (
                <Flex gap="small" align="middle-center" wrap>
                    {tags.map((tag) => {
                        let color = tag.length > 5 ? 'geekblue' : 'green';
                        if (tag === 'kawaii') {
                            color = 'volcano';
                        }
                        return (
                            <Tag color={color} key={tag}>
                                {tag.toUpperCase()}
                            </Tag>
                        );
                    })}
                </Flex>
            ),
        },
        {
            title: 'Giới tính',
            key: 'gender',
            dataIndex: 'gender',
            render: (gender) =>
                <Tag color={gender ? 'geekblue' : 'green'}>
                    {gender ? 'NỮ' : 'NAM'}
                </Tag>
        },
        {
            title: 'Chỉnh sửa',
            key: 'action',
            render: (_, record) => ( //_ :đại diện cho giá trị hiện tại, record là toàn bộ thông tin SV của dòng đang đc thao tác
                <Button
                    type="link"
                    onClick={() => handleEdit(record)}//nhấn nút gọi hàm handleEdit và truyền SV đang chọn
                >
                    Sửa
                </Button>
            ),
        },
        {
            title: 'Xóa',
            key: 'delete',
            render: (_, record) => (
                <Popconfirm
                    title="Xóa thông tin sinh viên"
                    description={`Bạn có chắc muốn xóa thông tin sinh viên ${record.name}?`}
                    onConfirm={() => handleDelete(record)}
                    okText="Có"
                    cancelText="Không"
                >
                    <Button
                        type="link" onClick={() => handleDelete} //nhấn nút gọi hàm handledelete và truyền SV đang chọn
                        danger //nút cảnh báo thường có màu đỏ
                        icon={<DeleteOutlined />}
                    >
                        Xóa
                    </Button>
                </Popconfirm>
            ),
        },

    ]; // đưa const column vào Table có thể nhìn thấy handle Edit và xử lý
    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);
        setEditStudent(null); // chắc chắn ko có ai  khi bấm thêm mới
    };
    const onClose = () => {
        setOpen(false);
        setEditStudent(null)
    };
    const [data, setData] = useState<DataType[]>(initialData);
    //hàm Xoá thông tin SV
    const handleDelete = (student: DataType) => { //nhận thông tin SV cần xoá
        setData(data.filter(item => item.key !== student.key)); //thực hiện xoá, giữ key các SV khác với SV đang chọn => cập nhật lại Bảng
    }
    const [editStudent, setEditStudent] = useState<DataType | null>(null); //edit là sửa SV, nếu null thì ko có ai => chế độ thêm
    //hàm xử lý chỉnh sửa SV
    const handleEdit = (student: DataType) => { //nhận thông tin SV cần sửa
        setEditStudent(student); //lưu SV đang muốn sửa
        setOpen(true); //mở drawer
    };
    const onFinish = (values: any) => {
        // Nếu đang sửa sinh viên
        if (editStudent) { // đúng => cập nhật
            const updatedData = data.map((student) => //duyệt qua từng SV và tìm đúng SV đang sửa
                student.key === editStudent.key //kiểm tra
                    ? { //? : thay cho if else
                        ...student, //dữ liệu SV cũ
                        ...values, //sửa form và đưa vào thông tin mới
                    }
                    : student
            );
            setData(updatedData); //thay dữ liệu cũ bằng dữ liệu mới
            onClose();
        } else {
            // Nếu thêm sinh viên mới
            const newStudent: DataType = {
                ...values,
                key: Date.now().toString(),
                id: `SV00${data.length + 1}`,
                tags: ['Mới'],
            };
            setData([...data, newStudent]);
            onClose();
        }
    };
    return (
        <div style={{ padding: 16 }}>
            {/* thanh tìm kiếm */}
            <Row gutter={[16, 16]}>
                <Col span={8}>
                    <Input placeholder="Nhập họ tên sinh viên" style={{ width: '100%' }} />
                </Col>
                <Col span={8}>
                    <Select
                        placeholder="Chọn lớp"
                        style={{ width: '100%' }}
                        allowClear
                        options={[
                            { value: '10A1', label: '10A1' },
                            { value: '10A1', label: '10A2' },
                            { value: '10A1', label: '10A3' },
                        ]}
                    />
                </Col>
                <Col span={8}>
                    <Space>
                        <Button
                            type="primary"
                            icon={<SearchOutlined />}
                            style={{ backgroundColor: '#2056bb', borderColor: '#1d8f75' }}
                        >
                            Tìm kiếm
                        </Button>
                        {/* nút thêm mới */}
                        <Button type="primary" onClick={showDrawer}>
                            Thêm mới SV
                        </Button>
                    </Space>
                </Col>
            </Row>
            <Table<DataType> columns={columns} dataSource={data} />
            <StudentDrawer
                open={open}
                onClose={onClose}
                onFinish={onFinish}
                student={editStudent}
            />
        </div>
    );
}
export default TableStudent;