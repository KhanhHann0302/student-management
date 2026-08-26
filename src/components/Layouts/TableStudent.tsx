import { Button, Drawer, Flex, Input, Select, Space, Table, type TableProps, Tag, Col, Row, Form, InputNumber } from 'antd';
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
    gender: boolean;
}

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
    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };
    const [data, setData] = useState<DataType[]>(initialData);
    const onFinish = (values: any) => {
        const newStudent: DataType = {
            ...values,
            key: Date.now().toString(),
            id: `SV00${data.length + 1}`,
            tags: ['Mới'],
        }

        setData([...data, newStudent]);
        onClose();
    };


    return (
        <div style={{ padding: 16 }}>
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
                        <Button type="primary" onClick={showDrawer}>
                            Thêm mới SV
                        </Button>
                    </Space>
                </Col>
            </Row>
            <Table<DataType> columns={columns} dataSource={data} />
            <Drawer
                title="Thêm mới sinh viên"
                placement="right"
                size={450}
                open={open}
                onClose={onClose}
            >
                <Form onFinish={onFinish} layout="vertical">
                    <Row gutter={[16, 16]}>
                        <Col span={12}>
                            <Form.Item
                                name="name"
                                label="Họ và tên"
                                rules={[{ required: true, message: 'Vui lòng nhập họ và tên!' }]}
                            >
                                <Input placeholder="Họ và tên" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="age" label="Tuổi">
                                <InputNumber placeholder="Tuổi" style={{ width: '100%' }} min={0} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col span={12}>
                            <Form.Item name="address" label="Địa chỉ">
                                <Input placeholder="Địa chỉ" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="class" label="Lớp">
                                <Select
                                    placeholder="Chọn lớp"
                                    allowClear
                                    options={[
                                        { value: '10A1', label: '10A1' },
                                        { value: '10A1', label: '10A2' },
                                        { value: '10A1', label: '10A3' },
                                    ]}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col span={12}>
                            <Form.Item name="major" label="Chuyên ngành">
                                <Input placeholder="Chuyên ngành" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="gender" label="Giới tính" initialValue={true}>
                                <Switch
                                    checkedChildren="Nữ"
                                    unCheckedChildren="Nam"
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row justify="end">
                        <Form.Item>
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
            </Drawer>
        </div>
    );
}

export default TableStudent;