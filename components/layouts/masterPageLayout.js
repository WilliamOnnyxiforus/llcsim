import React, { useState, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import withAuth from '../withAuth';
import { logout } from '../../redux/slices/authSlice';
import { NAVIGATION } from '../navigation';

import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { createTheme, Box, Grid2 } from '@mui/material';
import { parseCookies } from 'nookies';

const demoTheme = createTheme({
    cssVariables: {
        colorSchemeSelector: 'data-toolpad-color-scheme',
    },
    colorSchemes: { light: true, dark: true },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 600,
            lg: 1200,
            xl: 1536,
        },
    },
});

function DemoPageContent({ children }) {
    return (
        <Box
            sx={{
                py: 4,
                px: 4,
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            {children}
        </Box>
    );
}

function MasterPageLayout({ children, ...props }) {

    const { name, email } = parseCookies();
    const dispatch = useDispatch();
    const router = useRouter();

    const USERSESSION = {
        user: {
            name,
            email
        },
    };

    const authentication = useMemo(() => {
        return {
            signIn: () => { },
            signOut: () => {
                dispatch(logout())
                router.replace('/login');
            },
        };
    }, []);

    const routerNav = useMemo(() => {
        return {
            pathname: `/${location.pathname.split('/')[1]}`,
            searchParams: new URLSearchParams(),
            navigate: (path) => { router.replace(path) }
        };
    }, []);

    return (
        <AppProvider
            branding={{
                title: 'LLC SIM',
                logo: ''
            }}
            session={USERSESSION}
            router={routerNav}
            authentication={authentication}
            navigation={NAVIGATION}
            theme={demoTheme}
        >
            <DashboardLayout>
                <DemoPageContent>
                    {children}
                </DemoPageContent>
            </DashboardLayout>
        </AppProvider>
    );
}

export default withAuth(MasterPageLayout)