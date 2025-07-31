'use client';
import { Alert, Box, Button, Checkbox, FormControl, FormControlLabel, IconButton, InputAdornment, OutlinedInput, Stack, TextField } from "@mui/material";
import { createUser, FormState } from "../(actions)/createUser";
import { useActionState, useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { redirect } from "next/navigation";

export default function CreateUserForm() {
    const initialState: FormState = {
        user: undefined,
        error: undefined,
        data: undefined
    };
    const [state, formAction, isPending] = useActionState<FormState,FormData>(createUser,initialState); 
    const [show, setShow] = useState(false);
    if(state?.user) {
        redirect(`/user`);
    }
    return (
        <>
            {state?.error && <Alert severity="error" sx={{ mb: 2 }}>{state?.error}</Alert>}
            
            <Box padding={4} sx={{ width: { xs: '100%', md: '400px' }, mx: 'auto', mt: 4 }}>
                <form action={formAction}>
                    <Stack direction={'column'} gap={2}>
                        <TextField name="name" placeholder="Name" defaultValue={state?.data?.get('name')} />
                        <TextField name="email" placeholder="Email" defaultValue={state?.data?.get('email')}/>
                        <TextField name="image" placeholder="Avatar's URL" defaultValue={state?.data?.get('image')}/>
                        <FormControl>
                            <OutlinedInput
                                placeholder="Password"
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setShow(!show)}
                                            edge="end">
                                            {!show ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                type={!show ? 'password' : 'text'}
                                name={'password'}
                                defaultValue={state?.data?.get('password')}
                            />
                        </FormControl>
                        <FormControl>
                            <OutlinedInput
                                placeholder="Password confirmation"
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setShow(!show)}
                                            edge="end">
                                            {!show ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                type={!show ? 'password' : 'text'}
                                name={'passwordConfirmation'}
                                defaultValue={state?.data?.get('passwordConfirmation')}
                            />
                        </FormControl>
                        <FormControlLabel control={<Checkbox {...{label:'Is admin?',name:'isAdmin'}} defaultChecked />} label='Is Admin?'/>
                        <Button variant="contained" color="success" type="submit" disabled={isPending}>Salvar</Button>
                    </Stack>
                </form>
            </Box>
        </>
    );
}