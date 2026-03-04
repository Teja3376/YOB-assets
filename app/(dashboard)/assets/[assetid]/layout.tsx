import SpvTabs from "@/modules/SPV/ui/SpvTabs";
import { Metadata } from "next";
import React from "react";
 export const metadata:Metadata = {
    title: 'SPV - Overview',
    
}
export default function AssetLayout({ children }:{ children: React.ReactNode}){
    return (
        <div className="min-h-screen ">
            <SpvTabs/>
            <hr />
            {children}
        </div>
    )
}