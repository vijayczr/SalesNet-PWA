import React from 'react'
import { DownOutlined , ToolOutlined } from '@ant-design/icons';
import { Dropdown, message, Space } from 'antd';
import { useNavigate } from "react-router-dom";

export default function DarNavbar() {
    const onClick = ({ key }) => {
        // message.info(`Click on item ${key}`);
        navigate(`/${key}`, { replace: true });
    };
    const navigate = useNavigate();

    const items = [
        {
            label: 'DAR Summary',
            key: 'DarSummary',
        },
        {
            label: 'DAR Entry',
            key: 'AddDar',
        }

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
                <ToolOutlined />DAR<DownOutlined />
                </Space>
            </a>
        </Dropdown>
        </div>
    )
}

