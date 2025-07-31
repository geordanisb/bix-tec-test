'use client'
import getTransactionsLastTwoYears from "@/actions/getTransactionsTwoYearsBefore";
import getTransactionsOneYearBefore from "@/actions/getTransactionsOneYearBefore";
import getTransactionsThisYear from "@/actions/getTransactionsThisYear";
import {  FiltersStatePeriodHash, periodFiltersStore, transactionsStore } from "@/appStore";
import { BaseSelectProps, FormControl, MenuItem, Select } from "@mui/material";
import { useAtom } from "jotai";
import { useEffect } from "react";

interface Props extends BaseSelectProps {} 
export default function PeriodFilter({...others}:Props) {
    const [period, setperiod] = useAtom(periodFiltersStore);
    const [,setTransactions]=useAtom(transactionsStore);

    useEffect(()=>{
        const fn = async ()=>{
            let t;
            switch(period){
                case 'twoYearsBefore':
                    t=await getTransactionsLastTwoYears();
                    break;
                case 'oneYearBefore':
                    t=await getTransactionsOneYearBefore();
                    break;
                case 'thisYear':
                    t=await getTransactionsThisYear();
            }
            setTransactions(t);
        }
        fn();
    },[period])
    const handleChange = (e:any) => {
        setperiod(e.target.value);
    }
    
    return <FormControl>
        <Select
            labelId="filter-period"
            id="demo-simple-select"
            value={period}
            onChange={handleChange}
            {...others}
        >
            {
                Object.entries(FiltersStatePeriodHash).map(([k,v]) => <MenuItem key={k} value={k}>{v.toString()}</MenuItem>)
            }
        </Select>
    </FormControl>
}