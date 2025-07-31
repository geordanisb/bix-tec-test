'use client'
import { getTransactions, stateFiltersStore } from "@/appStore";
import { BaseSelectProps, FormControl, MenuItem, Select } from "@mui/material";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";

interface Props extends BaseSelectProps { }
export default function StateFilter({ ...others }: Props) {
    const [year, setyear] = useAtom(stateFiltersStore);
    const [transactionsResponse]=useAtom(getTransactions);
    let [states,setstates]=useState<Set<string>>(new Set());

    useEffect(()=>{
        if(transactionsResponse.state=='hasData' && transactionsResponse.data){
            states=new Set();
            transactionsResponse.data.forEach(
                (s)=>{
                    states.add(s.state)
                }
            );
            setstates(p=>states);
        }
    },[transactionsResponse])
    
    const handleChange = (e: any) => {
        setyear(e.target.value);
    }

    return <FormControl>
        <Select
            id="state-select"
            value={year}
            onChange={handleChange}
            {...others}
        >
            {
                [...states].map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)
            }
        </Select>
    </FormControl>
}