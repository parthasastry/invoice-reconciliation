import React from "react";

const Footer = () => {
    return (
        <div className="w-full mt-24 bg-slate-900 text-gray-300 py-y px-2">
            <div className="flex-col max-w-[1240px] m-auto justify-between sm:flex-row text-center text-white">
                <p className="py-4">
                    {new Date().getFullYear()} Parthasarathy Sastry, All Rights Reserved
                </p>
            </div>
        </div>
    );
};

export default Footer;