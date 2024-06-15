import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom';

const Notification = () => {

  const navigate = useNavigate();

  const user = JSON.parse(window.localStorage.getItem('user') || '{}')

  return (
    <div style={{ height: '100vh', display: 'flex', width: '100%', textAlign: 'center', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <h2 style={{ maxWidth: '70%'}}>আমাদের Apps এ কিছু আপডেট করা হয়েছে সবাই আমাদের নিউ Apps টি ডাউনলোড করে নেন (<a href='https://tmwott.top'>https://tmwott.top</a>) এবং আমাদের Whatsapp গ্রুপ এ এড হয়ে থাকতে পারেন Apps link :    whatsapp  গ্রুপ লিংক : <a href='https://chat.whatsapp.com/CnBLGdJ9pEd7qO4f0KzqcO'>https://chat.whatsapp.com/CnBLGdJ9pEd7qO4f0KzqcO</a></h2>
      <br/>
      <Button variant="contained" color="primary" onClick={()=>{
        window.App.openWhatsapp("+8801771769523", "Name: " + user.fullName + "\nPhone: " + user.phone + "\n\nHello Admin!\nআমার সাবস্ক্রিশনের মেয়াদ শেষ, নতুন করে সেবাটি চালু করতে চাই")
      }}>Admin Whatsapp</Button>
    </div>
  )
}

export default Notification