import React from 'react'
import { DownOutlined, ToolOutlined } from '@ant-design/icons';
import { Dropdown, message, Space } from 'antd';
import { useNavigate } from "react-router-dom";

export default function IsrNavbar() {
    const onClick = ({ key }) => {
        // message.info(`Click on item ${key}`);
        navigate(`/${key}`, { replace: true });
    };
    const navigate = useNavigate();

    const items = [
        {
            label: 'Customer Master',
            key: 'CustList',
        },
        {
            label: 'Add Customer',
            key: 'modifyCust',
        },
    ];

    return (
        <> 
         {/* <div></div> */}
            <Dropdown
                menu={{
                    items,
                    onClick,
                }}
            >
                <a onClick={(e) => e.preventDefault()}>
                    <Space>
                        <ToolOutlined />Customer Master<DownOutlined />
                    </Space>
                </a>
            </Dropdown>

            <Dropdown
            className='mx-3'
                menu={{
                    items : [
                        {
                            label: 'Create Quotation',
                            key: 'CreateQuotation'
                        },
                        {
                            label: 'Create Quotation',
                            key: 'CreateQuotation'
                        }
                    ],
                    onClick,
                }}
            >
                <a onClick={(e) => e.preventDefault()}>
                    <Space>
                        <ToolOutlined />Quotation<DownOutlined />
                    </Space>
                </a>
            </Dropdown>

        </>

    )
}
