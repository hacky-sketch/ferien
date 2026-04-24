import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import {HolidayForm} from "./HolidayForm.tsx";


createRoot(document.getElementById('root')!).render(
  <StrictMode>
<HolidayForm onSave={function ():void {

} } onCancel={function (): void{

}}></HolidayForm>
  </StrictMode>,
)
