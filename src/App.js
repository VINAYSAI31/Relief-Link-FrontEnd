
import './App.css';
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import Projecthome from './Components/Projecthome';
import Donorlogin from './Components/Donor/Donorlogin.jsx';
import Adminlogin from './Components/Admin/Adminlogin.jsx';
import Orglogin from './Components/Organization/Orglogin.jsx';
import Adminhome from './Components/Admin/Adminhome.jsx';
import Donorhome from './Components/Donor/Donorhome.jsx';
import Admins from './Components/Admin/Admins.jsx';
import DonorReg from './Components/Donor/DonorReg.jsx';
import Donors from './Components/Admin/Donors.jsx';
import Orgreg from './Components/Organization/Orgreg.jsx';
import Orghome from './Components/Organization/Orghome.jsx';
import Addcampaign from './Components/Organization/Addcampaign.jsx';
import Mycampaigns from './Components/Organization/Mycampaigns.jsx';
import AllCampaings from './Components/Donor/AllCampaings.jsx';

import Campaings from './Components/Admin/Campaigns.jsx';
import Myprofile from './Components/Donor/Myprofile.jsx';
import Payment from './Components/Donor/Payment.jsx';
import PaymentFormWrapper from './Components/Donor/Payment.jsx';
import DonationHistory from './Components/Donor/DonationHistory.jsx';
import MyDashBoard from './Components/Donor/MyDashboard.jsx';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Projecthome/>}/>
        
        <Route path='/Adminlogin' element={<Adminlogin/>}/>
        <Route path='/adminhome' element={<Adminhome/>}/>
        <Route path='/admins' element={<Admins />}/>
        <Route path='/donors'element={<Donors/>}/>
        <Route path='/campaigns' element={<Campaings/>}/>




        <Route path='/donorlogin' element={<Donorlogin/>}/>
        <Route path='donorreg' element={<DonorReg/>}/>
        <Route path='/donorhome' element={<Donorhome/>}/>
        <Route path='/allcamps' element={<AllCampaings/>}/>
        {/* <Route path="/payment/:id" element={<Payment />} /> */}
        <Route path="/payment/:campaignId" element={<PaymentFormWrapper />} />
        <Route path="/donationhistory" element={<DonationHistory/>}/>

        <Route path='/myprofile' element={<Myprofile/>}/>
        <Route path='/mydashboard' element={<MyDashBoard/>}/>
        






        <Route path='/orglogin' element={<Orglogin/>}/>
        <Route path='/orgreg' element={<Orgreg/>}/>
        <Route path='/orghome' element={<Orghome/>}/>
        <Route path='/addcampaign' element={<Addcampaign/>}/>
        <Route path='/mycampaigns' element={<Mycampaigns/>}/>
       

        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
