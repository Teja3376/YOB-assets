import React from 'react'
import { Tabs, TabsContent } from '@/components/ui/tabs'
import ActiveInvestors from '../components/Investors'

const Investors = ({ assetOverview }: { assetOverview: any }) => {

  return (
    <>
      <Tabs defaultValue="active" className=''>
        <TabsContent value="active">
          <ActiveInvestors assetOverview={assetOverview} />
        </TabsContent>
      </Tabs>
    </>
  )
}

export default Investors