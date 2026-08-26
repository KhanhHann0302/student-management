import { Button, Drawer, Flex, Input, Select, Space, Table, type TableProps, Tag, Col, Row, Form } from 'antd';
import { SaveOutlined, SearchOutlined } from '@ant-design/icons/es/icons/index';
import React, { useState } from 'react';
import { Switch } from 'antd';

interface DataType {
    key: string;
    id: string;
    name: string;
    age: number;
    address: string;
    class: string;
    major: string;
    tags: string[];
    gender: string;
    // action: string;
}

const columns: TableProps<DataType>['columns'] = [
    {
        title: 'Tên',
        dataIndex: 'name',
        key: 'name',
        render: (text) => <a style={{ color: '#333333' }}>{text}</a>
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

        render: (gender) => {
            let color = '';

            if (gender === 'nữ') {
                color = 'geekblue';
            } else {
                color = 'green';
            }

            return (
                <Tag color={color}>
                    {gender.toUpperCase()}
                </Tag>
            );
        },
    },
    // {
    //     title: 'Action',
    //     key: 'action',
    //     render: (_,) => (
    //         <Space size="medium">
    //             <a>Hoạt động </a>
    //             <a>Bảo lưu</a>
    //         </Space>
    //     ),
    // },
];

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
        gender: 'nam',
        // action: 'Hoạt động',
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
        gender: 'nữ',
        // action: 'Bảo Lưu',
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
        gender: 'nam',
        // action: 'Hoat động',
    },
];

const TableStudent: React.FC = () => {
    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };
    const [data, setData] = useState<DataType[]>(initialData);
    const [gender, setGender] = useState<string>('nữ');
    // Hàm xử lý lưu dữ liệu Form vào Table
    const onFinish = (values: any) => {
        const newStudent: DataType = {
            key: Date.now().toString(),
            id: `SV00${data.length + 1}`,
            name: values.name,
            age: Number(values.age) || 0,
            address: values.address || '',
            class: values.class || '',
            major: values.major || '',
            tags: ['Mới'],
            gender: values.gender ? 'nam' : 'nữ', // Switch: true = 'nữ', false = 'nam'
        };

        setData([...data, newStudent]);
        onClose();
    };

    return (


        <div style={{ padding: 16 }}>
            <Space style={{ marginBottom: 16, width: '100%' }} size="middle">
                {/* 1. Ô Nhập tên đơn vị */}
                <Input
                    placeholder="Nhập họ tên sinh viên"
                    style={{ width: 300 }}
                />

                <Select /*ô tìm kiếm*/
                    placeholder="Chọn lớp"
                    style={{ width: 300 }}
                    allowClear
                    options={[
                        { value: '1', label: '10A1' },
                        { value: '2', label: '10A2' },
                        { value: '3', label: '10A3' },
                    ]}
                />
                <Button
                    type="primary"
                    icon={<SearchOutlined />}
                    style={{ backgroundColor: '#2056bb', borderColor: '#1d8f75' }}
                >
                    Tìm kiếm
                </Button>

            </Space>
            <>
                <Flex justify="flex-end" style={{ marginBottom: 10 }}>
                    <Button type="primary" onClick={showDrawer}>
                        Thêm mới SV
                    </Button>
                </Flex>
                <Drawer
                    title="Basic Drawer"
                    closable={{ 'aria-label': 'Close Button' }}
                    onClose={onClose}
                    open={open}
                >
                </Drawer>
            </>

            <Table<DataType> columns={columns} dataSource={data} />
            <Drawer
                title="Thêm mới sinh viên"
                placement="right"
                width={450}
                open={open}
                onClose={onClose}
                styles={{
                    body: { paddingTop: 16 }, // Giảm khoảng cách lề trên xuống còn 12px (mặc định là 24px)
                }}
            >
                <p>
                    <Form onFinish={onFinish}>
                        <Row gutter={[16, 16]}>

                            <Col span={12}>
                                Họ và tên
                            </Col>
                            <Col span={12}>
                                Tuổi
                            </Col>
                        </Row>
                        <Row gutter={[16, 16]}>

                            <Col span={12}>
                                <Form.Item name="name">
                                    <Input placeholder="Họ và tên" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item name="age">
                                    <Input type="number" placeholder="Tuổi" />
                                </Form.Item>

                            </Col>
                        </Row>
                        <Row gutter={[16, 16]}>

                            <Col span={12}>
                                Địa chỉ
                            </Col>
                            <Col span={12}>
                                Lớp
                            </Col>
                        </Row>
                        <Row gutter={[16, 16]}>

                            <Col span={12}>
                                <Form.Item name="address">
                                    <Input placeholder="Địa chỉ" />
                                </Form.Item>

                            </Col>
                            <Col span={12}>
                                <Form.Item name="class">
                                    <Input placeholder="Lớp" />
                                </Form.Item>

                            </Col>
                        </Row>
                        <Row gutter={[16, 16]}>

                            <Col span={12}>

                                Chuyên ngành
                            </Col>
                            <Col span={12}>
                                <div>Giới tính</div>
                                <Switch
                                    checked={gender === 'nữ'}
                                    checkedChildren="Nữ"
                                    unCheckedChildren="Nam"
                                    onChange={(checked: boolean) => setGender(checked ? 'nữ' : 'nam')}
                                />
                            </Col>
                        </Row>
                        <Row gutter={[16, 16]}>

                            <Col span={12}>
                                <Form.Item name="major">
                                    <Input placeholder="Chuyên ngành" />
                                </Form.Item>

                            </Col>

                        </Row>

                        <Row justify="end" style={{ marginTop: 24 }}>
                            <Form.Item style={{ marginBottom: 0 }}>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    icon={<SaveOutlined />}
                                    style={{
                                        backgroundColor: '#366cf3',
                                        borderColor: '#366cf3',
                                        borderRadius: 6,
                                        paddingLeft: 20,
                                        paddingRight: 20,
                                    }}
                                >
                                    Thêm và lưu
                                </Button>
                            </Form.Item>
                        </Row>
                    </Form>


                </p>
            </Drawer>

        </div>



    );
}



export default TableStudent;