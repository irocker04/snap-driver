import React, {useEffect} from 'react';
import NotificationsScreenView from "./view";
import api from '../../../services/api';

const NotificationsScreenController = ({GetNotifications, notifications}: any) => {

    useEffect(() => {
        api.request
            .get('/profile/notifications/mark-read')
            .then((res) => {
                GetNotifications()
            })
    }, []);

    return (
        <NotificationsScreenView
            notifications={notifications}
        />
    );
};

export default NotificationsScreenController;
