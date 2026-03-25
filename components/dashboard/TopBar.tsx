"use client"

import { useState, useEffect } from "react";
import {User} from "lucide-react";

export default function TopBar() {
        const [date, setDate] = useState("");

        useEffect(()=> {
            const now = new Date();
            const options: Intl.DateTimeFormatOptions = {
                weekday: "short",
                month: "short",
                day: "numeric",
            };
            setDate(now.toLocaleDateString("en-US", options));
        }, []);

        return(
            <div className="w-full flex justify-between items-center bg-[#121212] p-4 rounded-2xl mb-6 shadow-sm">
                {/* Greeting */}
                <div>
                    <h2 className="text-gray-400 text-sm">Good Afternoon, Komron</h2>
                    <p className="text-white font-semibold text-lg">{date}</p>
                </div>

                {/* User */}
                <div className="flex items-center gap-3">
                    <User className="text-gray-400" size={24}/>
                    <span className="text-gray-400">Admin</span>
                </div>
            </div>
        );
}
