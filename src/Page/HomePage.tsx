
import React from 'react';
import { Card, Col, Row, Button } from 'antd';
import Title from 'antd/es/typography/Title';
import Text from 'antd/es/typography/Text';
import Paragraph from 'antd/es/typography/Paragraph';
const nhomNganh = [
    {
        title: "Công nghệ TT",
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhTWqxEQHJlS9M06jwu6ElFXWzPnXfbTtcZas6ThuvJr18MsLlP7-fsJUQ&s=10',
        description:
            'Đào tạo ngành về phần mềm, hệ thống, dữ liệu và công nghệ thông tin.',
        majors:
            'Công nghệ thông tin, Kỹ thuật phần mềm, An toàn thông tin',
    },
    {
        title: 'Kinh tế - Quản trị',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgurJkqiD2_9rPxqoOlfar3DtgR5EUn8dx0Axv9Kw5zP9nZwKMXSwOaCAV&s=10',
        description:
            'Trang bị kiến thức về quản trị, kinh doanh, tài chính và marketing.',
        majors:
            'Quản trị kinh doanh, Marketing, Tài chính - Ngân hàng',
    },
    {
        title: 'Y - Dược',
        image:
            'https://tuetinh.edu.vn/wp-content/uploads/2023/04/nganh-y-duoc-1.jpg',
        description:
            'Đào tạo chuyên sâu về sức khỏe, y học và chăm sóc cộng đồng.',
        majors:
            'Y khoa, Dược học, Điều dưỡng',
    },
    {
        title: 'Sư phạm',
        image:
            'https://cdn2.tuoitre.vn/471584752817336320/2025/3/13/man-hanh-tng-tac-cre-trang-thth-17418911490001014706988.jpg',
        description:
            'Đào tạo giáo viên chất lượng cao cho hệ thống giáo dục.',
        majors:
            'Sư phạm Toán, Sư phạm Tiếng Anh, Giáo dục Mầm non',
    },
]
const Home: React.FC = () => {
    return (
        <div style={{ padding: '10px 20px 30px' }}>
            {/* TIÊU ĐỀ */}
            <div style={{textAlign: 'center', marginBottom: 30}}>
                <Title level={1} style={{ marginBottom: 8, color: '#172554' }} >
                    Khám phá các khối ngành nghề
                </Title>
                <Text style={{ fontSize: 16, color: '#666' }}>
                    Tìm hiểu các nhóm ngành nghề
                </Text>
            </div>
            {/* DANH SÁCH CARD */}
            <Row gutter={[20, 20]}>
                {nhomNganh.map((group) => (
                    <Col
                        xs={24} //màn hình đth
                        sm={12} //màn hình tablet
                        lg={6} //màn hình máy tính
                        key={group.title}
                    >
                        <Card hoverable
                            style={{
                                height: '100%',
                                borderRadius: 10,
                                overflow: 'hidden',
                            }}
                            styles={{body: {padding: 16,},}}
                            cover={
                                <img src={group.image} alt={group.title} style={{height: 150, objectFit: 'cover'}}/>}
                        >
                            {/* TÊN KHỐI NGÀNH */}
                            <Title level={4} style={{marginTop: 0, marginBottom: 10, color: '#1677ff'}}>
                                {group.title}
                            </Title>
                            {/* MÔ TẢ */}
                            <Paragraph style={{ minHeight: 65, marginBottom: 10 }}>
                                {group.description}
                            </Paragraph>

                            {/* NGÀNH TIÊU BIỂU */}
                            <Text strong style={{ color: '#1677ff'}}>
                                Ngành tiêu biểu:
                            </Text>
                            <Paragraph style={{minHeight: 65, marginTop: 5}} >
                                {group.majors}
                            </Paragraph>
                            {/* NÚT */}
                            <Button type="primary" block>
                                Xem chi tiết
                            </Button>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};
export default Home;