import React from 'react';

import { Breadcrumbs, Typography, Link } from '@mui/material';

//Icons
import HomeIcon from '@mui/icons-material/Home';

function handleClick(event) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
}

export default function BreadcrumbsBar({ breadcrumbsList }) {
    return (
        <div role="presentation">
            <Breadcrumbs aria-label="breadcrumb" separator="›">
                <Link
                    underline="hover"
                    sx={{ display: 'flex', alignItems: 'center' }}
                    color="inherit"
                    href="/home"
                >
                    <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                    Home
                </Link>
                {breadcrumbsList.map((breadcrumb, index) => {
                    const isLast = index === breadcrumbsList.length - 1;
                    return isLast ? (
                        <Typography sx={{ color: 'text.primary', display: 'flex', alignItems: 'center' }} key={breadcrumb.label}>
                            {breadcrumb.icon}
                            {breadcrumb.label}
                        </Typography>
                    ) : (
                        <Link
                            key={breadcrumb.label}
                            color="inherit"
                            sx={{ display: 'flex', alignItems: 'center' }}
                            href={breadcrumb.href}
                            underline="hover"
                        >
                            {breadcrumb.icon}
                            {breadcrumb.label}
                        </Link>
                    );
                })}
            </Breadcrumbs>
        </div>
    );

}