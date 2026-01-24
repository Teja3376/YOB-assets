

import FormGenerator from '@/components/use-form/FormGenerator';
import galleryFormConfig from '@/modules/Assets/form-config/Media&Documents/galleryFormConfig';

const Index = () => {
   return(
    <div className='grid  gap-2'>{FormGenerator(galleryFormConfig())}</div>
   );
};
export default Index;
