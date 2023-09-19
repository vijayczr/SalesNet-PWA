import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '../Header/Header.css';
import logo2 from '../../assets/logo.png';
import defaultpfp from '../../assets/Default_pfp.svg.png'
import Popover from "@material-ui/core/Popover";
import '../../Pages/Dashboard/Dashboard.css'

export default function AppHeader() {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <nav class="navbar cssHead">
                <div class="headlogo1 ">
                    <img src={logo2} class="img-fluid logo" />
                </div>
                <div class="d-flex align-items-end">
                    <img src={defaultpfp} class="defaultpfp"   onClick={(event) => {
                        setAnchorEl(event.currentTarget)

                    }}/> 
                    <Popover
                        anchorEl={anchorEl}

                        open={open}
                        id={open ? "simple-popover" : undefined}
                        transformOrigin={{
                            horizontal: "right",
                            vertical: "top",
                        }}
                        anchorOrigin={{
                            horizontal: "right",
                            vertical: "bottom",
                        }}
                        onClick={handlePopoverClose}
                    >

                        <div class="profile-menu" >
                            <div class="profile-option p-3" >
                                    <div class="mt-2 row">
                                        <div class="col-sm-1">
                                            <img src={defaultpfp} class="defaultpfp2" alt="" />
                                        </div>
                                        <div class="userDataa">
                                            <h6>Vijay SIngh</h6>
                                            <p>vjvijay130@gmail.com</p>
                                        </div>
                                    </div>
                            </div>
                            <a href="/Dashboard">hey</a>
                        </div>
                    </Popover>
                </div>
            </nav>
        </div>

    )
}