import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import { RouterProvider } from 'react-router-dom';
import router from './routers/router.jsx';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
);

/*
ব্যাখ্যাঃ 
1.
<RouterProvider router={router} /> এখানে কিন্ত <RouterProvider router={<router/>} /> লেখা যাবে না। কারণ router একটি ভ্যালু হিসেবে পাস করতে হবে যদিও এটি একটি কম্পোনেন্ট হিসেবে কাজ করছে।
*/
