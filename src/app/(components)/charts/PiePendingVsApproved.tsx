// 'use client'
// import {  getTransactions } from '@/appStore';
// import { Transaction } from '@/generated/prisma';
// import { Box } from '@mui/material';
// import Chart from 'chart.js/auto';
// import { useAtom } from 'jotai';
// import { useEffect } from 'react';

// export default function PiePendingVsApproved() {
//     const [transactions] = useAtom(getTransactions);

//     useEffect(() => {
//         const ctx = document.getElementById('pie-chart-PiePendingVsApproved');
//         let chart: Chart;
//         let pendingQty = 0;
//         pendingQty = transactions?.reduce((p, c: Transaction) => {
//             if (c.pending == 1) {
//                 p++;
//             }
//             return p;
//         }, pendingQty);

//         let approvedQty = 0;
//         approvedQty = transactions?.reduce((p, c: Transaction) => {
//             if (c.pending == 0) {
//                 p++;
//             }
//             return p;
//         }, approvedQty);

//         const cfg = {
//             type: 'pie',
//             data: {
//                 datasets: [{
//                     data: [approvedQty, pendingQty]
//                 }],

//                 // These labels appear in the legend and in the tooltips when hovering different arcs
//                 labels:['Approved','Pending']
//                 // // labels:['Approved','Pending'],
//                 // datasets: [{
//                 //     label: `Pending vs Approved in ${FiltersStatePeriodHash[period]}`,
//                 //     data: [{ x: 'Approved', y: approvedQty }, { x: 'Pending', y: pendingQty }]
//                 // }]
//             }
//         }

//         if (ctx) {
//             chart = new Chart(ctx as any, cfg as any);
//         }
//         return () => { chart.destroy() }
//     },[transactions])

//     return <Box sx={{position:'relative',width:'350px',height:'185px'}}>
//         <canvas id="pie-chart-PiePendingVsApproved" />
//     </Box>
// }
export default ()=><></>