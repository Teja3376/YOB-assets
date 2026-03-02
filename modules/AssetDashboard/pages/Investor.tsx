import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import ActiveInvestors from '../components/Investors'
import WaitList from './WaitList'

const Investors = ({ assetOverview }: { assetOverview: any }) => {



  return (


    <>
      <Tabs defaultValue="active" className=''>
        <TabsList className='bg-transparent gap-2'>
          <TabsTrigger value="active" className='px-4 py-2  rounded-full data-[state=active]:bg-black data-[state=active]:text-white border border-gray-200'>Active Investors</TabsTrigger>
          <TabsTrigger value="waitlist" className='px-4 py-2 rounded-full data-[state=active]:bg-black data-[state=active]:text-white border border-gray-200'>Waitlist</TabsTrigger>
        </TabsList>
        <TabsContent value="active">
          <ActiveInvestors assetOverview={assetOverview} />
        </TabsContent>
        <TabsContent value="waitlist">
          <div className=" rounded-md p-4">
            <WaitList />
          </div>
        </TabsContent>

      </Tabs>
    </>
  )
}

export default Investors