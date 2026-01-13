import { useState } from 'react'
import axios from 'axios'
import { api } from '@/lib/api-client'

type KycStatus = 'pending' | 'approved' | 'rejected' | 'in_progress'

const useKyc = () => {
  const [kyc, setKyc] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const updateKycStatus = async (status: KycStatus = 'approved') => {
    setLoading(true)
    setError(null)
    
    try {
      // Get token from storage


      // Make API call
      const response = await api.post(
        '/auth-issuer/kyc',
        { kycStatus: status }
      )

      setKyc(status === 'approved')
      return response.data
    } catch (err: any) {
      const errorMessage = err?.response?.data?.message || err?.message || 'Failed to update KYC status'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return {
    kyc,
    setKyc,
    updateKycStatus,
    loading,
    error,
  }
}

export default useKyc