// 'use client'
// import { FiltersStatePeriodHash, getTransactions, yearFiltersStore } from '@/appStore';
// import { EXPENSES_VALUE, REVENUES_VALUE } from '@/constants';
// import { Transaction } from '@/generated/prisma';
// import { Box } from '@mui/material';
// import Chart from 'chart.js/auto';
// import { useAtom } from 'jotai';
// import { useEffect } from 'react';

// export default function BarRevenuesVsExpenses() {
//     const [year] = useAtom(yearFiltersStore);
//     const [transactions] = useAtom(getTransactions);


//     useEffect(() => {
//         const ctx = document.getElementById('bar-chart-BarRevenuesVsExpenses');
//         let chart: Chart;
//         let revenuesQty = 0;
//         revenuesQty = transactions?.reduce((p, c: Transaction) => {
//             if (c.transaction_type == REVENUES_VALUE && !c.pending) {
//                 p++;
//             }
//             return p;
//         }, revenuesQty);

//         let expensesQty = 0;
//         expensesQty = transactions?.reduce((p, c: Transaction) => {
//             if (c.transaction_type == EXPENSES_VALUE && !c.pending) {
//                 p++;
//             }
//             return p;
//         }, expensesQty);

//         const cfg = {
//             type: 'bar',
//             data: {
//                 datasets: [{
//                     label: `Revenues vs Expenses in ${FiltersStatePeriodHash[period]}`,
//                     data: [{ x: 'Revenues', y: revenuesQty }, { x: 'Expenses', y: expensesQty }],
//                     backgroundColor: [
//                         '#5A9D5C',
//                         '#F79751',
//                     ],
//                     borderColor: [
//                         '#448C47',
//                         '#F18331'
//                     ],
//                     borderWidth: 4
//                 }]
//             }
//         }

//         if (ctx) {
//             chart = new Chart(ctx as any, cfg as any);
//         }
//         return () => { chart.destroy() }
//     })

//     return <Box sx={{ position: 'relative', width: { xs: '100dvw', md: '35dvw' }, height: { xs: 'auto', md: '35dvh' } }}>
//         <canvas id="bar-chart-BarRevenuesVsExpenses" />
//     </Box>
// }
export default ()=><></>