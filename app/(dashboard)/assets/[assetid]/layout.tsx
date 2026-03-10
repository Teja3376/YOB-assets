import AssetTabs from "@/modules/Assets/ui/AssetTabs";
import { Metadata } from "next";
import React from "react";
 export const metadata:Metadata = {
    title: 'Asset - Overview',
    
}
export default function AssetLayout({ children }:{ children: React.ReactNode}){
    return (
        <div className="min-h-screen ">
            <AssetTabs/>
            <hr />
            {children}
        </div>
    )
}