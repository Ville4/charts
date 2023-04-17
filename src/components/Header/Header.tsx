import { Settings } from "@mui/icons-material"
import { IconButton } from "@mui/material"
import { NavLink } from "react-router-dom"
import m from './header.module.css'


const Header: React.FC = () => {

    return (
        <div className={m.container}>
            <NavLink to='/view'>
                <h1 className={m.title}>Charts</h1>
            </NavLink>
            <NavLink to="/settings" >
                <IconButton color="inherit">
                    <Settings />
                </IconButton>
            </NavLink>
        </div>
    )
}

export default Header