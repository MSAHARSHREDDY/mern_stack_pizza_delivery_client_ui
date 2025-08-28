'use client';

import React from 'react';
import { Button } from '../ui/button';
import { logout } from '@/lib/actions/logout';

const Logout = () => {
    return (
        <Button
            size={'sm'}
            className='bg-orange-600'
            onClick={async () => {
                await logout();
            }}>
            Logout
        </Button>
    );
};

export default Logout;
