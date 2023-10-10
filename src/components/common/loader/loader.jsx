import React from "react";

export const Loader = () => {
    return(
<div className="fixed inset-0 flex justify-center items-center z-50 bg-gray-950 bg-opacity-50">
      <div className="animate-spin rounded-full border-t-4 border-blue border-opacity-90 h-24 w-24"></div>
    </div>
)}