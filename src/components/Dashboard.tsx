'use client';
import { logoutUser } from '@/components/auth/actions';
import Button from '@/components/ui/Button';

const Dashboard = () => {
    const handleLogout = async () => await logoutUser();
    return <Button onClick={handleLogout}>Wyloguj się</Button>;
};

export default Dashboard;
