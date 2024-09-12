import React, { useState } from "react";
import { Button, Row, Col, Checkbox, Form, Input, Select } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import "../components/LoginForm.css";

function LoginForm() {
    const [form] = Form.useForm();
    // const onFinish = (values) => {
    //     console.log('Success:', values);
    // };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const navigate = useNavigate(); // Sử dụng useNavigate để điều hướng

    // Khai báo các state cho username, password và thông báo lỗi
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(false); // Thêm trạng thái loading
    const [authMethod, setAuthMethod] = useState('local'); // Thêm state cho phương thức xác thực

    // Hàm xử lí khi nhấn nuts đăng nhập
    const handleLogin = async (values) => {
        if (authMethod !== 'local') { // Kiểm tra nếu không phải 'local'
            setErrorMessage('chưa có code xong "domain" đâu!');
            setSuccessMessage('');
            return; // Dừng thực hiện đăng nhập
        }
        setLoading(true); // Bắt đầu tải
        // Gửi yêu cầu POST đến API
        try {
            const response = await fetch('', {
                // link đến trang API 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    username: values.username, // Dùng giá trị từ form
                    password: values.password,
                }),
            });
            const data = await response.json();
            console.log(data.message); // Kiểm tra dữ liệu phản hồi từ API
            if (data.message === 'Login successfully !') {
                // if (data.data && data.data.acc)
                // Đăng nhập thành công
                setSuccessMessage('Đăng nhập thành công!');
                setErrorMessage('');
                // Bạn có thể lưu token vào localStorage để sử dụng sau này
                localStorage.setItem('token', data.token);
                // Chuyển hướng người dùng đến trang đăng nhập thành công
                navigate("/loginSuccess");
            } else {
                // Đăng nhập thất bại
                setErrorMessage('Thông tin đăng nhập không đúng');
                setSuccessMessage('');
            }
        } catch (error) {
            setErrorMessage('Có lỗi xảy ra, vui lòng thử lại sau.');
            setSuccessMessage('');
        } finally {
            setLoading(false); // Kết thúc tải
        }
    };

    const handleChange = (value) => {
        setAuthMethod(value); // Cập nhật phương thức xác thực khi thay đổi
    };

    return (
        <Row className="login-container" justify={"center"} align={"middle"}>
            <Col className="Col1">
                <div className="header">
                    <img src="https://dev.ddc.fis.vn/econstruction_web_client/assets/logo-ctc-horizontal-BCKyPDAh.png" alt="logo" className="logo" />
                    <h1>eConstruction</h1>
                    <h2>Đăng nhập để tiếp tục</h2>
                </div>

                <Form form={form}
                    onFinish={handleLogin}
                    className="login-form"
                    requiredMark="optional"

                    layout="vertical"

                    initialValues={{
                        remember: true,
                    }}
                    // onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >

                    <Form.Item >
                        <h3>Phương thức xác thực</h3>
                        <Select defaultValue="local" onChange={handleChange} className="input-field" >
                            <option value="local" style={{ fontSize: '18px' }} >local</option>
                            <option value="domain" style={{ fontSize: '18px' }} >domain</option>
                        </Select>
                    </Form.Item>

                    {authMethod === 'local' && (
                        <> <Form.Item label={<h3>Tài Khoản</h3>} className="custom-label" name="username" rules={[{ required: true, message: 'Nhập tài khoản', },]} >
                            <Input type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                prefix={<UserOutlined />} className="input-field" />
                        </Form.Item>

                            <Form.Item label={<h3>Mật Khẩu</h3>} className="custom-label" name="password" rules={[{ required: true, message: 'Nhập mật khẩu', },]}>
                                <Input.Password type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    prefix={<LockOutlined />} className="input-field" />
                            </Form.Item>

                            <Form.Item name="remember" valuePropName="checked">
                                <Checkbox>Ghi nhớ</Checkbox>
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" block htmlType="submit" loading={loading}> {/* Hiển thị trạng thái loading */}
                                    Đăng nhập
                                </Button>

                                {/* Hiển thị thông báo nếu có lỗi */}
                                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                                {/* Hiển thị thông báo nếu thành công */}
                                {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
                            </Form.Item></>
                    )}

                    {authMethod !== "local" && (
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Xác thực Domain
                            </Button>
                        </Form.Item>
                    )}

                </Form>
            </Col>
        </Row>

    );
}

export default LoginForm;