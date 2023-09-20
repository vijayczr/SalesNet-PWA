import React from 'react'
import { DownOutlined , ToolOutlined } from '@ant-design/icons';
import { Dropdown, message, Space } from 'antd';

export default function HrNavbar() {
    const onClick = ({ key }) => {
        message.info(`Click on item ${key}`);
    };

    const items = [
        {
            label: 'Employee Master',
            key: '1',
        },
        {
            label: 'Employee Design',
            key: '2',
        },
        {
            label: 'Employee Dept',
            key: '3',
        },
        {
            label: 'Manage Holiday',
            key: '4',
        },
        {
            label: 'Employee Target',
            key: '5',
        },
        {
            label: 'Human Resources',
            key: '6',
        },
    ];
    return (

        <Dropdown
            menu={{
                items,
                onClick,
            }}
        >
            <a onClick={(e) => e.preventDefault()}>
                <Space>
                <ToolOutlined /> Human Resources <DownOutlined />
                </Space>
            </a>
        </Dropdown>

    )
}
