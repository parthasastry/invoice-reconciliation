import React from 'react';
import { Link, animateScroll as scroll } from "react-scroll";

const Navbar = () => {
    return (
        <div className='fixed w-full flex justify-between items-center h-24 max-w[1240px] mx-auto px-4 bg-gray-300 drop-shadow-lg'>
            <h1 className='w-full text-3xl font-bold'>Reconcile Invoices with Timecards</h1>
            <ul className='flex justify-between uppercase font-bold'>
                <li className='p-4'>
                    <Link to="home" smooth={true} duration={500}>Home</Link>
                </li>
                <li className='p-4'>
                    <Link to="summary" smooth={true} duration={500}>Summary</Link>
                </li>
                <li className='p-4'>
                    <Link to="details" smooth={true} duration={500}>Details</Link>
                </li>
                <li className='p-4'>
                    <Link to="faq" smooth={true} duration={500}>FAQ</Link>
                </li>

            </ul>
        </div>
    )
}

export default Navbar