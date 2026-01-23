export interface Asset {
    _id?: string;
    name?: string;
    tenantName?: string;
    companyName?: string;
    class?: string;
    status?: string;
    approvalStatus?: 'Pending' | 'Approved' | 'Rejected' | string;
    about?: string;
    country?: string;
    state?: string;
    currency?: string;
    basePropertyValue?: number;
    rejectionReason?: string;
    superAdminComments?: string;
    totalPropertyValueAfterFees?: number;
    [key: string]: any;
  }