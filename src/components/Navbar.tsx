import { Menu } from '@mui/icons-material';
import { NavLink } from "react-router-dom"

export interface INavbarProps {
    handleExpanded: () => void;
    isExpanded: boolean;
}

export function Navbar(props: INavbarProps) {

    return (
        <div>
            <nav className="navigation">
                <div className="brand-name">
                    <h4>Movie <span>Den</span></h4>
                    <div className="hamburger" onClick={props.handleExpanded}>
                        <Menu />
                    </div>
                </div>
                <div className={`nav-links  ${props.isExpanded ? `` : `expanded`}`}>
                    <ul>
                        <li>
                            <NavLink to='/'>
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/search'>
                                Explore
                            </NavLink>
                        </li>
                        </ul>
                </div>
            </nav>
        </div>
    );
}
