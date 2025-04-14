// import React from 'react';
// import { useState, useEffect } from 'react';
// import { fetchComplaintLogs } from './api'; // Assuming you have an API function for fetching logs

// const ComplaintLogUI = () => {
//   const [complaintLogs, setComplaintLogs] = useState([]);

//   // Fetch complaint logs on component mount
//   useEffect(() => {
//     const getLogs = async () => {
//       const logs = await fetchComplaintLogs();
//       setComplaintLogs(logs);
//     };
//     getLogs();
//   }, []);

//   return (
//     <section className="py-12 px-4 bg-white">
//       <div className="max-w-5xl mx-auto">
//         <h2 className="text-2xl font-bold text-blue-600 mb-10 tracking-wide text-center">
//           Complaint Logs
//         </h2>

//         <div className="space-y-6">
//           {complaintLogs.map((log) => (
//             <div key={log._id} className="flex flex-col md:flex-row items-center text-left bg-blue-50 p-6 rounded-lg shadow-lg border-l-4 border-blue-500">
//               {/* Left side: Action info */}
//               <div className="md:w-1/3 mb-6 md:mb-0">
//                 <h3 className="text-lg font-semibold text-blue-600 mb-2">{log.actionType}</h3>
//                 <p className="text-gray-700 text-sm">Actioned by: {log.actionBy.name}</p>
//                 <p className="text-gray-700 text-sm">Complaint ID: {log.complaint}</p>
//               </div>

//               {/* Right side: Status and Message */}
//               <div className="md:w-2/3 pl-8">
//                 <div className="flex flex-col">
//                   <p className="text-sm text-gray-500">
//                     <strong>Previous Status:</strong> {log.previousStatus || 'N/A'}
//                   </p>
//                   <p className="text-sm text-gray-500">
//                     <strong>New Status:</strong> {log.newStatus || 'N/A'}
//                   </p>
//                   {log.message && (
//                     <div className="mt-4">
//                       <p className="text-gray-700">{log.message}</p>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ComplaintLogUI;
