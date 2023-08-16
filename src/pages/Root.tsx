import * as React from 'react';
import { Outlet } from 'react-router-dom'
import { Navbar } from '../components/Navbar';

export function Root() {
    const [isExpanded, setIsExpanded] = React.useState(false)
    const handleExpanded = () => {
        if(isExpanded){
            setIsExpanded(false)
        }else if (!isExpanded) {
            setIsExpanded(true)
        }
    }
    return (
        <div>
            <div>
                <Navbar
                    handleExpanded={handleExpanded}
                    isExpanded={isExpanded}
                />
            </div>
            <Outlet />
        </div>
    );
}
