import * as React from 'react';
import { Outlet } from 'react-router-dom'
import { Navbar } from '../components/Navbar';
import { Error } from '../components/Error';

export function Root() {
    /* ---navbar expanded state to toggle hamburger menu */
    const [isExpanded, setIsExpanded] = React.useState(false)
    const handleExpanded = () => {
        setIsExpanded(!isExpanded)
    }
    /* -----state to check if user device is connected to the internet */
    const [isOnLine, setIsONLine] = React.useState(navigator.onLine)
    React.useEffect(() => {
        addEventListener('online', () => setIsONLine(navigator.onLine))
        addEventListener('offline', () => setIsONLine(navigator.onLine))
        return () => {
            removeEventListener('online', () => setIsONLine(navigator.onLine))
            removeEventListener('offline', () => setIsONLine(navigator.onLine))
        }
    }, [isOnLine])
    return (
        <div>
            <div>
                {!isOnLine ? <Error message={`network error : You are currentlly offline`} /> : null}
                <Navbar
                    handleExpanded={handleExpanded}
                    isExpanded={isExpanded}
                />
            </div>
            <Outlet />
        </div>
    );
}
