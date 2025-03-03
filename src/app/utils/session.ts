'use client'
const key = "secret-customer"
export const setUser = (user: any) => {
    window.localStorage.setItem(key, JSON.stringify(user));
}

export const getUser = () => {
    const user = window.localStorage.getItem(key);
    return (user ? JSON.parse(user) : null);
}

export const isCustomer = () => getUser() !== null;

export const removeSessions = () => window.localStorage.clear();