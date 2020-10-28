import React from 'react';
import PropTypes from 'prop-types';
import { Form, Mentions, Button } from 'antd';

const CommentForm = ({ prompt, currentUser, onSubmit }) => {
    const [form] = Form.useForm();
    
    const handleSubmit = (formData) => {
        onSubmit(formData.comment);
        form.resetFields()
    };

    return (
        <Form form={form} layout={'inline'}onFinish={handleSubmit}>
            <img width='25px' src={currentUser.avatarUrl} />
            <Form.Item name="comment">
                <Mentions
                    autoSize={true}
                    placeholder={prompt}
                >
                </Mentions>
            </Form.Item>
            <Button type="primary" htmlType="submit">
                Post
            </Button>
        </Form>
    );
};

CommentForm.propTypes = {
    prompt: PropTypes.string,
    currentUser: PropTypes.object.isRequired,
    onSubmit: PropTypes.func,
};

export default CommentForm;
