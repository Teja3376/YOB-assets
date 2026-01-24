import FormGenerator from '@/components/use-form/FormGenerator'
import investorConfig from '@/modules/Assets/form-config/TokenInformation/InvestorConfig'

const index = () => {
  return (
    <div>
      <h1 className='text-xl font-semibold text-gray-900'>Investor Requirements & Timeline</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
        {FormGenerator(investorConfig())}
      </div>  
    </div>
  )
}

export default index
