import { api } from "@/lib/api-client";
import { SpvPayload } from "../utils/global";
import { useState } from "react";
import { toast } from "sonner";
import { SPVType } from "../utils/global";
type Status = 'idle' | 'loading' | 'success' | 'error';

// Fields that should be excluded from update requests (MongoDB internal fields)
const EXCLUDED_FIELDS = ['_id', 'userId', 'createdAt', 'updatedAt', '__v', 'lastModified' , "webkitRelativePath" , "size" , "type" , "lastModifiedDate"];

// Helper function to clean data by removing MongoDB internal fields
const cleanUpdateData = (data: any): any => {
  if (data === null || data === undefined) return data;
  
  if (Array.isArray(data)) {
    return data.map(item => cleanUpdateData(item));
  }
  
  if (typeof data === 'object') {
    const cleaned: any = {};
    for (const key in data) {
      if (!EXCLUDED_FIELDS.includes(key)) {
        cleaned[key] = cleanUpdateData(data[key]);
      }
    }
    return cleaned;
  }
  
  return data;
};

const useUpdateSpv = () => {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);
  const [responseData, setResponseData] = useState<any>(null);

  const updateSpv = async (id: string, data: SpvPayload) => {
    setStatus('loading');
    setError(null);
    setResponseData(null);
    try {
      // Remove MongoDB internal fields that shouldn't be sent in update requests
      const cleanData = cleanUpdateData(data);
      
      const res = await api.put(`/spv/${id}`, cleanData);
      // const hasRequiredData = 
      // data.daoConfiguration && 
      // data.daoConfiguration.blockchain && 
      // data.daoConfiguration.daoName &&
      // data.name && 
      // data.type && 
      // data.jurisdiction;
    
    // if (hasRequiredData) {
     
    //      // Upload to IPFS first
    //      const metadata = {
    //        name: data.name,
    //        spa_type: data.type,
    //        currency: data.currency,
    //        jurisdiction: data.jurisdiction,
    //        businessPurpose: data.businessPurpose,
    //        legalDocuments: [
    //          {
    //            articlesOfAssociation_name: data.legalDocuments?.articlesOfAssociation?.name || "",
    //            articlesOfAssociation_url: data.legalDocuments?.articlesOfAssociation?.url || ""
    //          },
    //          {
    //            llcOperatingAgreement_name: data.legalDocuments?.llcOperatingAgreement?.name || "",
    //            llcOperatingAgreement_url: data.legalDocuments?.llcOperatingAgreement?.url || ""
    //          },
    //          {
    //            memorandumOfAssociation_name: data.legalDocuments?.memorandumOfAssociation?.name || "",
    //            memorandumOfAssociation_url: data.legalDocuments?.memorandumOfAssociation?.url || ""
    //          },
    //          {
    //            otherDocuments_name: data.legalDocuments?.otherDocuments?.name || "",
    //            otherDocuments_url: data.legalDocuments?.otherDocuments?.url || ""
    //          }
    //        ] as [
    //          { articlesOfAssociation_name: string; articlesOfAssociation_url: string },
    //          { llcOperatingAgreement_name: string; llcOperatingAgreement_url: string },
    //          { memorandumOfAssociation_name: string; memorandumOfAssociation_url: string },
    //          { otherDocuments_name: string; otherDocuments_url: string }
    //        ]
    //      };
         
    //     //  const ipfsResult = await uploadSpaFiles(metadata);
         
    //      // Map the company type to the expected enum
    //      const companyTypeMap: Record<string, SPVType> = {
    //        'llc': SPVType.LLC,
    //        'private-limited': SPVType.PrivateLimited,
    //        'dao-llc': SPVType.DAOLLC,
    //        'corporation': SPVType.Corporation,
    //        'public-entity': SPVType.PublicEntity,
    //        'partnership': SPVType.Partnership
    //      };
         
    //      const companyType: SPVType = companyTypeMap[data.type];
        
     
    // }
    
    setStatus('success');
    toast.success('Spv updated successfully');
    setResponseData(res.data.data);
    return res.data;
  
} catch (err: any) {
    setStatus('error');
    toast.error(
      err.response?.data?.message || err.message || 'Failed to update Spv'
    );
    setError(
      err.response?.data?.message || err.message || 'Failed to update Spv'
    );
    throw err;
  }
}
return { updateSpv, status, error, responseData };
};

export default useUpdateSpv;
