import React from 'react'
import { DownOutlined , ToolOutlined } from '@ant-design/icons';
import { Dropdown, message, Space } from 'antd';
import { useNavigate } from "react-router-dom";

export default function HrNavbar() {
    const onClick = ({ key }) => {
        // message.info(`Click on item ${key}`);
        navigate(`/${key}`, { replace: true });
    };
    const navigate = useNavigate();

    const items = [
        {
            label: 'Employee Master',
            key: 'HR',
        },
        {
            label: 'Employee Design',
            key: 'HrEmpDesig',
        },
        {
            label: 'Employee Dept',
            key: 'HREmpDept',
        },
        {
            label: 'Manage Holiday',
            key: 'ManageHoliday',
        },
        {
            label: 'Employee Target',
            key: 'HrEmpTargetList',
        },
        {
            label: 'Human Resources',
            key: 'HumanResource',
        },
    ];
    return (

        <div >
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
        </div>
    )
}
