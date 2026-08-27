import { Button, Col, Drawer, Form, Input, InputNumber, Row, Select, Switch } from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import { useEffect } from 'react';
import type { DataType } from '../../models/Student';
interface StudentDrawerProps {
    open: boolean; //trạng thái đóng mở của drawer
    onClose: () => void; //ẩn drawer
    onFinish: (values: any) => void; // nhận dữ liệu từ Form
    student?: DataType | null; //? có nghĩa là ko bắt buộc truyền. nếu Sửa thì truyền SV vào, nếu Thêm mới thì sẽ ko truyền
}
const StudentDrawer = ({ //khai báo component nhận 4 vào dữ liệu (props)
    open,
    onClose,
    onFinish,
    student,
}: StudentDrawerProps) => {
    const [form] = Form.useForm();
    useEffect(() => { //khi dữ liệu thay đổi => thực hiện hành động => student thay đổi -> kiểm tra và cập nhật
        if (student) { //có SV đang đc chọn để sửa ko
            form.setFieldsValue(student); // đưa dữ liệu vào Form thông tin cũ
        } else {
            form.resetFields(); //xoá dữ liệu khỏi Form
        }
    }, [student, form]); //useEffect sẽ chạy lại khi Student hoặc Form thay đổi
    //=> useEffect theo dõi sự thay đổi của student để khi nào đưa dữ liệu vào hoặc xoá Form
    return (
        <Drawer
            title={student ? 'Chỉnh sửa SV' : 'Thêm mới SV'}
            placement="right"
            size={450}
            open={open}
            onClose={onClose}
        >
            <Form form={form} layout="vertical" onFinish={onFinish} >
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
                                    { value: '10A2', label: '10A2' },
                                    { value: '10A3', label: '10A3' },
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
                        <Form.Item name="gender" label="Giới tính" valuePropName="checked">
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
    );
};
export default StudentDrawer;