import React from 'react';
import {useContext} from "react";
import NotificationContext from "./NotificationContext.jsx";
import subscriber from "./Subscriber.js";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';
import List from '@mui/material/List';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import Subscriber from "./Subscriber.js";

function NotificationDisplay(){


    const {state: notificationState, updateNotifications, broadcastMessage} = useContext(NotificationContext);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    //add the subscriber
    function addSubscriber(){
        const name = document.getElementById("addUserText").value;
       notificationState.subscribers.push(new subscriber(name));
       updateNotifications({...notificationState});

    }

    function handleSubscriberClicked(){
        const message = document.getElementById("sendMessage").value;
        const notifiedSubscribersCount = broadcastMessage(message);
        // Force update Context, which forces this component to rerender
        alert(`${notifiedSubscribersCount} subscribers were notified!`);
        updateNotifications({...notificationState});
    }

    // remove the subscriber
    function removeSubscriber(id){

       const index =  notificationState.subscribers.indexOf(id)
        notificationState.subscribers.splice(index, 1)
        updateNotifications({...notificationState});
    }

    return (
        <div>
            <div>
                <Button
                    style={{margin: '10px', paddingRight: '20px'}}
                    id="demo-positioned-button"
                    aria-controls={open ? 'demo-positioned-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                >
                    Dashboard
                </Button>
                <Menu
                    id="demo-positioned-menu"
                    aria-labelledby="demo-positioned-button"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                >
                    <MenuItem>
                        <List>
                            <ListItem>
                                <div>
                                    {notificationState.subscribers.map((Subscriber, index)=>
                                        <div key={index}>
                                            <Button variant="outlined" endIcon={<DeleteIcon onClick={removeSubscriber}/>}>
                                                {Subscriber.name}
                                            </Button>
                                        </div>) }
                                </div>
                            </ListItem>
                        </List>
                    </MenuItem>
                </Menu>
            </div>

                <TextField label="Add User Here..." style={{paddingRight: '10px'}} variant="standard" id="addUserText" />
                <Button variant="contained" id="addButton" style={{margin: '10px'}} onClick={addSubscriber}>Add</Button>

            <TextField
                id="sendMessage"
                label="Type message here..."
                multiline
                maxRows={10}
                style={{paddingLeft: '10px'}}
            />

                        <Button variant = "outlined" onClick={handleSubscriberClicked}>
                            Add Message
                        </Button>
            <div>
                {notificationState.subscribers.map((Subscriber, i)=>
                    <div key={i}>
                        {Subscriber.notifications.map((notification, index)=>(
                            <div key={{index}}>
                                <h6>{notification}</h6>
                            </div>))
                        }
                    </div>) }
            </div>




        </div>

    )
}

export default NotificationDisplay;