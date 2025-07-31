'use client'
import { getTransactions, stateFiltersStore } from "@/appStore";
import { BaseSelectProps, FormControl, MenuItem, Select } from "@mui/material";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";

interface Props extends BaseSelectProps { }
export default function StateFilter({ ...others }: Props) {
    const [year, setyear] = useAtom(stateFiltersStore);
    const [sumaryResponse]=useAtom(getTransactions);
    let [states,setstates]=useState<Set<string>>(new Set());

    useEffect(()=>{
        if(sumaryResponse.state=='hasData' && sumaryResponse.data){
            // states=new Set();
            // Object.keys(sumaryResponse.data.states).forEach(
            //     (s)=>{
            //         states.add(s)
            //     }
            // );
            setstates(p=>new Set(Object.keys(sumaryResponse.data.states)));
        }
    },[sumaryResponse])
    
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