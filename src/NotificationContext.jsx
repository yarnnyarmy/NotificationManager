import React, { useReducer, createContext, useMemo } from "react";
import subscriber from "./Subscriber.js";
const NotificationContext = createContext();

const ACTIONS = {
    UPDATE: "u",
};

const initialState = {
    subscribers:  [],
};

const reducer = (state, action) => {
    const { newState } = action;
    // Actions
    switch (action.type) {
        case ACTIONS.UPDATE:
            return { ...state, ...newState };
        default:
            return state;
    }
};


export const NotificationProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
//
    function updateNotifications(newState){
        dispatch({ type: ACTIONS.UPDATE, newState })
    }

    function broadcastMessage(message){
        state.subscribers.forEach((subscriber)=>subscriber.notify(message));
        return state.subscribers.length;
    }

    const context = {
        state,
        dispatch,
        updateNotifications,
        broadcastMessage
    };
    const contextValue = useMemo(() => context, [state, dispatch]);

    return (
        <NotificationContext.Provider value={contextValue}>{children}</NotificationContext.Provider>
    );
};

export default NotificationContext;

