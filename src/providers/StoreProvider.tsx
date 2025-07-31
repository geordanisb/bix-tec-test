'use client';
import { Provider } from "jotai";
import { useAtom } from "jotai";
import { notifyStore } from "@/appStore";
import { Snackbar } from "@mui/material";

const SnackbarC = () => {
    const [notify, setNotify] = useAtom(notifyStore);

    const onClose = () => {
        setNotify({
            open: false,
            message: '',
            severity: 'info'
        });
    };
    return <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={notify.open}
        onClose={onClose}
        message={notify.message}
        key={notify.message}
    />
}
export default function StoreProvider({ children }: { children: React.ReactNode }) {


    return (
        <Provider>
            {children}
            <SnackbarC />
        </Provider>
    );
}