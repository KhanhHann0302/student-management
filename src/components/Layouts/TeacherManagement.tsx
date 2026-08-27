import React, { useState } from 'react';
import { Table, Button, Input, Select, Space, Row, Col, Tag, Popconfirm, Drawer, Form } from 'antd';
import { EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import type { TableProps } from 'antd';
import type { TeacherType } from '../../models/Student';
const initialTeachers: TeacherType[] = [
    {
        key: '1',
        id: 'GV001',
        name: 'Trần Văn Trà',
        age: 45,
        email: 'tragv@university.edu.vn',
        phone: '0905123456',
        major: 'Công nghệ thông tin',
        academicRank: 'Tiến sĩ',
        status: true,
    },
    {
        key: '2',
        id: 'GV002',
        name: 'Ngô Văn Cường',
        age: 38,
        email: 'cuong123@university.edu.vn',
        phone: '0905654321',
        major: 'Kinh tế',
        academicRank: 'Thạc sĩ',
        status: true,
    },
    {
        key: '3',
        id: 'GV003',
        name: 'Nguyễn Thị Ngọc',
        age: 38,
        email: 'ngocnguyen@university.edu.vn',
        phone: '0905654321',
        major: 'Kinh tế',
        academicRank: 'Thạc sĩ',
        status: true,
    },
];
const TeacherManagement: React.FC = () => {
    const columns: TableProps<TeacherType>['columns'] = [
        { title: 'Mã GV', dataIndex: 'id', key: 'id' },
        { title: 'Họ và Tên', dataIndex: 'name', key: 'name' },
        { title: 'Tuổi', dataIndex: 'age', key: 'age' },
        { title: 'Email', dataIndex: 'email', key: 'email' },
        { title: 'SĐT', dataIndex: 'phone', key: 'phone' },
        { title: 'Khoa', dataIndex: 'major', key: 'major' },
        {
            title: 'Học hàm/Học vị',
            dataIndex: 'academicRank',
            key: 'academicRank',
            render: (rank) => <Tag color="blue">{rank}</Tag>,
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <Tag color={status ? 'green' : 'red'}>
                    {status ? 'ĐANG DẠY' : 'ĐÃ NGHỈ'}
                </Tag>
            ),
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button type="link" icon={<EditOutlined />} onClick={() => handleOpenDrawer(record)}>
                        Sửa
                    </Button>
                    <Popconfirm
                        title="Xóa giảng viên"
                        description={`Xác nhận xóa giảng viên ${record.name}?`}
                        onConfirm={() => handleDelete(record.key)}
                        okText="Xóa"
                        cancelText="Hủy"
                    >
                        <Button type="link" danger icon={<DeleteOutlined />}>
                            Xóa
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];
    const [data, setData] = useState<TeacherType[]>(initialTeachers);
    const [selectedMajor, setSelectedMajor] = useState<string | undefined>(undefined);
    const [openDrawer, setOpenDrawer] = useState(false);
    const [editTeacher, setEditTeacher] = useState<TeacherType | null>(null);
    const [searchName, setSearchName] = useState<string>(''); //tìm kiếm sau tên sau khi bấm nút
    const [searchMajor, setSearchMajor] = useState<string | undefined>(undefined);
    const [form] = Form.useForm();
    const handleSearch = () => { //chỉ lọc kq khi bấm nút tìm kiếm
        setSearchName(searchName);
        setSearchMajor(selectedMajor);
    }
    // lọc giảng viên
    const filteredTeachers = data.filter((teacher) => {
        const matchName = teacher.name.toLowerCase().includes(searchName.toLowerCase().trim());
        const matchMajor = searchMajor ? teacher.major === searchMajor : true;
        return matchName && matchMajor;
    });
    // 2. Mở Drawer Thêm / Sửa
    const handleOpenDrawer = (teacher?: TeacherType) => {
        if (teacher) {
            setEditTeacher(teacher);
            form.setFieldsValue(teacher);
        } else {
            setEditTeacher(null);
            form.resetFields();
        }
        setOpenDrawer(true);
    };
    // 3. Xử lý lưu form (Thêm / Sửa)
    const handleSave = (values: any) => {
        if (editTeacher) {
            setData((prev) =>
                prev.map((item) => (item.key === editTeacher.key ? { ...item, ...values } : item))
            );
        } else {
            const newTeacher: TeacherType = {
                ...values,
                key: Date.now().toString(),
                id: `GV00${data.length + 1}`,
                status: true,
            };
            setData([...data, newTeacher]);
        }
        setOpenDrawer(false);
    };
    // 4. Xóa giảng viên
    const handleDelete = (key: string) => {
        setData((prev) => prev.filter((item) => item.key !== key));
    };
    // 5. Cột hiển thị của Bảng
    return (
        <div style={{ padding: 16 }}>
            {/* Bộ lọc & Nút Thêm mới */}
            <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
                <Col span={8}>
                    <Input
                        placeholder="Tìm theo tên giảng viên..."
                        value={searchName}
                        onChange={(e) => setSearchName(e.target.value)}
                        style={{ width: '100%' }}
                    />
                </Col>
                <Col span={8}>
                    <Select
                        placeholder="Chọn Khoa"
                        style={{ width: '100%' }}
                        allowClear
                        value={selectedMajor}
                        onChange={(val) => setSelectedMajor(val)}
                        options={[
                            { value: 'Công nghệ thông tin', label: 'Công nghệ thông tin' },
                            { value: 'Kinh tế', label: 'Kinh tế' },
                            { value: 'Ngoại ngữ', label: 'Ngoại ngữ' },
                        ]}
                    />
                </Col>
                <Col span={8}>
                    <Space>
                        <Button style={{ backgroundColor: '#2056bb', borderColor: '#1d8f75' }}
                            type="primary"
                            onClick={handleSearch}
                            icon={<SearchOutlined />}>
                            Tìm kiếm
                        </Button>
                        <Button type="primary" onClick={() => handleOpenDrawer()}>
                            Thêm mới GV
                        </Button>
                    </Space>
                </Col>
            </Row>
            {/* Bảng Giảng Viên */}
            <Table columns={columns} dataSource={filteredTeachers} rowKey="key" />
            {/* Drawer Thêm / Sửa Giảng Viên */}
            <Drawer width={400}
                title={editTeacher ? 'Chỉnh sửa giảng viên' : 'Thêm mới giảng viên'}
                open={openDrawer}
                onClose={() => setOpenDrawer(false)}>
                <Form form={form} layout="vertical" onFinish={handleSave}>
                    <Form.Item name="name" label="Họ và Tên" rules={[{ required: true, message: 'Nhập họ tên!' }]}>
                        <Input placeholder="Ví dụ: Nguyễn Văn A" />
                    </Form.Item>
                    <Form.Item name="age" label="Tuổi">
                        <Input type="number" placeholder="Ví dụ: 35" />
                    </Form.Item>
                    <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email', message: 'Email không hợp lệ!' }]}>
                        <Input placeholder="example@university.edu.vn" />
                    </Form.Item>
                    <Form.Item name="phone" label="Số điện thoại" >
                        <Input placeholder="0905xxxxxx" />
                    </Form.Item>
                    <Form.Item name="major" label="Khoa">
                        <Select
                            options={[
                                { value: 'Công nghệ thông tin', label: 'Công nghệ thông tin' },
                                { value: 'Kinh tế', label: 'Kinh tế' },
                                { value: 'Ngoại ngữ', label: 'Ngoại ngữ' },
                            ]} />
                    </Form.Item>
                    <Form.Item name="academicRank" label="Học hàm/Học vị">
                        <Select
                            options={[
                                { value: 'Thạc sĩ', label: 'Thạc sĩ' },
                                { value: 'Tiến sĩ', label: 'Tiến sĩ' },
                                { value: 'Phó Giáo sư', label: 'Phó Giáo sư' },
                                { value: 'Giáo sư', label: 'Giáo sư' },
                            ]} />
                    </Form.Item>
                    <Form.Item style={{ marginTop: 24 }}>
                        <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
                            <Button onClick={() => setOpenDrawer(false)}>Hủy</Button>
                            <Button type="primary" htmlType="submit">
                                Lưu lại
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Drawer>
        </div>
    );
};
export default TeacherManagement;