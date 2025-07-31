'use client'
import { getTransactions, isLoadingStore } from '@/appStore';
import { EXPENSES_VALUE, REVENUES_VALUE } from '@/constants';
import { Transaction } from '@/generated/prisma';
import { getMonthNames } from '@/utils';
import { Box, CircularProgress } from '@mui/material';
import Chart from 'chart.js/auto';
import { useAtom } from 'jotai';
import { useEffect } from 'react';

export default function StackedBarPendingTransactions() {
    const [sumaryResponse] = useAtom(getTransactions);
    const[isLoading]=useAtom(isLoadingStore);

    useEffect(() => {
        const ctx = document.getElementById('bar-chart-StackedBarPendingTransactions');
        let chart: Chart;
        if(sumaryResponse.state=='hasData' && sumaryResponse.data){
            let revenues = sumaryResponse.data.pendingTransactions.map(pt=>pt.revenues);
            // sumaryResponse.data?.forEach((t: Transaction) => {
            //     if (t.transaction_type == REVENUES_VALUE && t.pending) {
            //         const month = (new Date(Number(t.date))).getMonth();
            //         revenues[month] ++;
            //     }
            // });
    
            let expenses = sumaryResponse.data.pendingTransactions.map(pt=>pt.expenses);

            // sumaryResponse.data?.forEach((t: Transaction) => {
            //     if (t.transaction_type == EXPENSES_VALUE && t.pending) {
            //         const month = (new Date(Number(t.date))).getMonth();
            //         expenses[month] ++;
            //     }
            // });
    
            const cfg = {
                type: 'line',
    
                data: {
                    // datasets: [{
                    //     label: `Revenues vs Expenses in ${FiltersStatePeriodHash[period]}`,
                    //     data: [{ x: 'Revenues', y: revenuesQty }, { x: 'Expenses', y: expensesQty }],
                    //     backgroundColor: [
                    //         '#5A9D5C',
                    //         '#F79751',
                    //     ],
                    //     borderColor: [
                    //         '#448C47',
                    //         '#F18331'
                    //     ],
                    //     borderWidth: 4
                    // }]
                    datasets: [
                        {
                            label: 'Revenues',
                            data: revenues,
                            // stack: 'lv1',
                        },
                        {
                            label: 'Expenses',
                            data: expenses,
                            // stack: 'lv1',
                        },
                    ],
                    labels: getMonthNames()
                },
                // options: {
                //     scales: {
                //         y: {
                //             stacked: true
                //         }
                //     }
                // }
            }
    
            if (ctx) {
                chart = new Chart(ctx as any, cfg as any);
            }
            return () => { chart.destroy() }
        }
    })

    return <Box sx={{ position: 'relative', width: '100%', height: { xs: 'auto', md: '35dvh' } }}>
        {isLoading && <CircularProgress/>}
        <canvas id="bar-chart-StackedBarPendingTransactions" />
    </Box>
}