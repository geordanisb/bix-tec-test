'use client';
import { notifyStore } from "@/appStore";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Paper, Stack, TextField } from "@mui/material";
import { useAtom } from "jotai";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignInForm() {
    const [show, setShow] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isPending, setIsPending] = useState(false);
    const [notify,setNotify] = useAtom(notifyStore);
    const router = useRouter();
    const onSubmit = async (event: React.FormEvent) => {
        setIsPending(true);
        
        event.preventDefault();
        if (!username || !password) {
            setNotify({
                open: true,
                message: 'Preencha todos os campos',
                severity: 'error'
            });
            setIsPending(false);
            return;
        }

        signIn('credentials', {
            username,
            password,
            redirect: false,
        }).then((result) => {
            if (result?.error) {
                setNotify({
                    open: true,
                    message: result.error!,
                    severity: 'error'
                });
                setIsPending(false);
            } else {
                console.log('Login successful');
                setIsPending(false);
                router.push('/');
            }
        });
    }
    const onUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    }
    const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }
    
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Paper sx={{ width: { xs: '100%', md: '400px' }, mx: 'auto', mt: 4 }}>
                <Stack gap={2} padding={4} >
                    <FormControl fullWidth>
                        <TextField value={username} onChange={onUsernameChange} placeholder="Usuário" required />
                    </FormControl>
                    <FormControl>
                        <OutlinedInput
                            placeholder="Senha"
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
                            value={password}
                            onChange={onPasswordChange}
                        />
                    </FormControl>
                    {/* <FormControl>
                        <OutlinedInput
                            placeholder="Confirme sua senha"
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
                            value={passwordConfirm}
                            onChange={onPasswordConfirmChange}
                        />
                    </FormControl> */}
                    {/* <Stack direction={'row'} gap={2} alignItems={'center'}>
                        <TextField sx={{ width: '90%' }} type={!show ? 'password' : 'text'} value={password} onChange={onPasswordChange} label="Senha" />
                        {
                            !show
                                ? <IconButton size='small' onClick={() => setShow(true)}>
                                    <Visibility />
                                </IconButton>
                                : <IconButton size='small' onClick={() => setShow(false)}>
                                    <VisibilityOff />
                                </IconButton>
                        }
                    </Stack> */}
                    <Button
                        onClick={onSubmit}
                        variant="contained"
                        color="success"
                        disabled={isPending}
                    >Entrar</Button>
                </Stack>
            </Paper>
        </Box>
    );
}