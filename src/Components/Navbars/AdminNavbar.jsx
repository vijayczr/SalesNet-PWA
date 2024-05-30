import { DownOutlined, ToolOutlined } from '@ant-design/icons';
import { Dropdown,  Space } from 'antd';
import { useNavigate } from "react-router-dom";

export default function AdminNavbar() {
    const onClick = ({ key }) => {
        // message.info(`Click on item ${key}`);
        navigate(`/${key}`, { replace: true });
    };
    const navigate = useNavigate();

    const adminPanel = [
        {
            label: 'CEO Desk',
            key: 'ceoDesk',
        },
        {
            label: 'Upcoming Events',
            key: 'upcomingEvents',
        },
        {
            label: 'Human Resource',
            key: 'humanResource',
        },
        {
            label: 'Knowledge sharing',
            key: 'knowledgeSharing',
        },
        {
            label: 'Manage Blog',
            key: 'manageBlog',
        },
        {
            label: 'Current Job Opening',
            key: 'currentJobOpening',
        },
        {
            label: 'Create Test',
            key: 'createTest',
        },
        {
            label: 'Assign Test',
            key: 'assignTest',
        },
        {
            label: 'Manage Assignment',
            key: 'manageAssignment',
        },{
            label: 'Quote of the day',
            key: 'quoteOfTheDay',
        },{
            label: 'Wishes Template',
            key: 'wishesTemplate',
        },
    ];

    const adminActions = [
        {
            label: 'Employees Master',
            key: 'empMaster',
        },
        {
            label: 'Customer Master',
            key: 'custMaster',
        },
        {
            label: 'Principal Master',
            key: 'AdmPrincipal',
        },
        {
            label: 'Product Master',
            key: 'productMaster',
        },
        {
            label: 'Employee Department',
            key: 'empDept',
        },
        {
            label: 'Employee Designation',
            key: 'empDesignation',
        },
        {
            label: 'Activity Area',
            key: 'activityArea',
        },
        {
            label: 'Dar Movement',
            key: 'darMovement',
        },
        {
            label: 'Competitor',
            key: 'competitor',
        },
        {
            label: 'Change Password',
            key: 'changePassword',
        },
        {
            label: 'Configuration Incentive',
            key: 'configIncentive',
        },
        {
            label: 'Employee DAR Report',
            key: 'empDarReport',
        },
        {
            label: 'Manipulate App DAR',
            key: 'manipulateAppDar',
        },
        {
            label: 'Price List',
            key: 'priceList',
        },
        {
            label: 'Customer Contact',
            key: 'custContact',
        },
        {
            label: 'Application Head',
            key: 'appHead',
        },
        {
            label: 'Colleague Docs',
            key: 'collDocs',
        },
        {
            label: 'Manage Holidays',
            key: 'manageHolidays',
        },
        {
            label: 'Delete Lead',
            key: 'deleteLead',
        },
    ];

    const targetAndIncentives = [
        {
            label: 'Quarter Master',
            key: 'quarterMaster',
        },
        {
            label: 'Principal Quarter Name',
            key: 'principalQuarterName',
        },
        {
            label: 'Techlab Principal Target',
            key: 'techlabPrincipalTarget',
        },
        {
            label: 'Techlab Target',
            key: 'techlabTarget',
        },
        {
            label: 'Branch Target',
            key: 'branchTarget',
        },
        {
            label: 'Employee Target',
            key: 'empTarget',
        },
        {
            label: 'Revenue Percentage',
            key: 'revenuePercentage',
        },
        {
            label: 'Incentive Report',
            key: 'incentiveReport',
        },
        {
            label: 'InActive Employee Target',
            key: 'inactiveEmpTarget',
        },
    ];

    const reviewMaster = [
        {
            label: 'Manage Head',
            key: 'manageHead',
        },
        {
            label: 'Manage Group',
            key: 'manageGroups',
        },
        {
            label: 'Employee To Group',
            key: 'empToGroup',
        },
        {
            label: 'Group To Head',
            key: 'groupToHead',
        },
        {
            label: 'Manage Sections',
            key: 'manageSections',
        },
        {
            label: 'Manage Questions',
            key: 'manageQuestions',
        },
        {
            label: 'Manage Static Questions',
            key: 'manageStaticQuestions',
        },
        {
            label: 'Manage Review Form',
            key: 'manageReviewForm',
        },
        {
            label: 'HR Comments',
            key: 'hrComments',
        },
        {
            label: 'Send Reminder',
            key: 'sendReminder',
        },
        {
            label: 'Acceptence Report',
            key: 'acceptenceReport',
        },
        {
            label: 'Appraisal/Promotion Letters',
            key: 'appraisalPromotionLetters',
        },
        {
            label: 'Accept Letter',
            key: 'acceptLetter',
        },
        {
            label: 'My Review Form',
            key: 'myReviewForm',
        },
        {
            label: 'Review History',
            key: 'reviewHistory',
        },
        {
            label: 'Manage SLA',
            key: 'manageSla',
        },
        {
            label: 'Manage Salary Breakup',
            key: 'manageSalaryBreakup',
        },
    ];

    const hrReview = [
        {
            label: 'My Review Form',
            key: 'myReviewForm'
        },
        {
            label: 'Review History',
            key: 'reviewHistory'
        }
    ];

    const adminActions2 = [
        {
            label: 'Principal Master',
            key: 'AdmPrincipal',
        }
    ]

    return (
        <div style={{ background: '#F3F5F9', paddingBottom: "0.5rem" }}> 
            {/* <Dropdown
                menu={{
                    items: adminPanel,
                    onClick,
                }}
            >
                <a style={{ color: 'black' }} onClick={(e) => e.preventDefault()}>
                    <Space>
                        <ToolOutlined />Admin Panel<DownOutlined />
                    </Space>
                </a>
            </Dropdown> */}

            <Dropdown
            className='mx-3'
                menu={{
                    items : adminActions2,
                    onClick,
                }}
            >
                <a style={{ color: 'black' }} onClick={(e) => e.preventDefault()}>
                    <Space>
                        <ToolOutlined />
                        <span style={{ fontSize: '14px' }}>Administrative Action</span>
                        <DownOutlined style={{ fontSize: '14px' }} />
                    </Space>
                </a>
            </Dropdown>

            {/* <Dropdown
            className='mx-3'
                menu={{
                    items : targetAndIncentives,
                    onClick,
                }}
            >
                <a style={{ color: 'black' }} onClick={(e) => e.preventDefault()}>
                    <Space>
                        <ToolOutlined />Target & Incentive<DownOutlined />
                    </Space>
                </a>
            </Dropdown> */}

            {/* <Dropdown
            className='mx-3'
                menu={{
                    items : reviewMaster,
                    onClick,
                }}
            >
                <a style={{ color: 'black' }} onClick={(e) => e.preventDefault()}>
                    <Space>
                        <ToolOutlined />Review Master<DownOutlined />
                    </Space>
                </a>
            </Dropdown> */}

            {/* <Dropdown
            className='mx-3'
                menu={{
                    items : hrReview,
                    onClick,
                }}
            >
                <a style={{ color: 'black' }} onClick={(e) => e.preventDefault()}>
                    <Space>
                        <ToolOutlined />HR Review<DownOutlined />
                    </Space>
                </a>
            </Dropdown> */}

        </div>

    )
}
