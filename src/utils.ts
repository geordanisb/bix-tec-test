import { DEFAULT_CURRENCY } from "./constants"

export const formatAmountFromNumber = (amount:number,currency?:string)=>{
    const c = currency ?? DEFAULT_CURRENCY;
    switch(c){
        case 'brl':
            return `BR$ ${amount.toFixed(2)}`
    }
    //TODO bug : https://github.com/testing-library/jest-dom/issues/376
    // return new Intl
    //             .NumberFormat("pt-BR", { style: "currency", currency: "BRL" })
    //             .format(amount)
}

export const amountFromString = (amount:string)=>{
    return Number(((+amount)/100))
}

export const getLastNYearsYearName = (n:number)=>{
    return (new Date(new Date().setFullYear(new Date().getFullYear() - n))).getFullYear()
}
export const getLastNYearsAsTimestamp = (n:number)=>{
    return (new Date(new Date().setFullYear(new Date().getFullYear() - n))).getTime()
}

export const getMonthNames = ()=>{
    return  [...Array(12)].map((p,idx)=>(new Intl.DateTimeFormat("en-US", {month:'long'}).format(new Date(`2025-${idx+1}-1`))))
}