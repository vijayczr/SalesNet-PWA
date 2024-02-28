export const CallStatusList = [
  { id: 1, value: "Hot" },
  { id: 2, value: "Medium" },
  { id: 3, value: "Cold" },
];

export const CallTypeList = [
  { id: 1, value: "Phone" },
  { id: 2, value: "Physical" },
  { id: 3, value: "Other" },
];

export const LeadList = [
  { id: 1, value: "Self" },
  { id: 2, value: "Lead" },
];

export const ContinueLeadList = [
  { id: 1, value: "Self" },
  { id: 2, value: "Lead" },
  { id: 3, value: "Continue" },
]

export const DAR_VerticalList = [
  { id: 1, value: "ASG" },
  { id: 2, value: "ISG" },
  { id: 3, value: "PSG" },
  { id: 6, value: "ESG" }
];

export const SalesStatus = [
  { id: 1, value: "Open" },
  { id: 2, value: "Closed" },
  { id: 3, value: "Lost" },
];

export const LostReasonList = [
  { id: 1, value: "Insufficient Fund" },
  { id: 2, value: "Higher price" },
  { id: 3, value: "Technically not qualified" },
  { id: 4, value: "Competitor" },
  { id: 5, value: "Others" },
];

export const OpportunityStatusList = [
  { id: 1, value: "Introduction Call (10%)" },
  { id: 2, value: "Demo Done (10%)" },
  { id: 3, value: "Quotation Submitted (20%)" },
  { id: 4, value: "Fund Available (20%)" },
  { id: 5, value: "Final Negotiation (20%)" },
  { id: 6, value: "Order Received (15%)" },
  { id: 7, value: "Payment Received (5%)" },
  { id: 8, value: "Installation/Training" },
  { id: 9, value: "Payment Followup" },
  { id: 10, value: "Technical Support / AMC" },
  { id: 11, value: "InOffice" },
];

export const FundAvailableOptionsList = [
  { id: "Yes", value: "Yes" },
  { id: "No", value: "No" },
];


export const plainOptions = [5, 18, 28];

export const productColumns = [
  {
    title: 'Product',
    dataIndex: 'productName',
    key: 'productName',
    width: '16%',
  },
  {
    title: 'Price',
    dataIndex: 'techlabPrice',
    key: 'techlabPrice',
    width: '8%',
  },
  {
    title: 'Quoted Price',
    dataIndex: 'quotedPrice',
    key: 'quotedPrice',
    width: '12%',
  },
  {
    title: 'Product Value',
    dataIndex: 'productValue',
    key: 'productValue',
    width: '12%',
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
    width: '40%',
  }
]