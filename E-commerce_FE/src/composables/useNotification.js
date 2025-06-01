import { ref } from 'vue';

const notifications = ref([]);
let notificationId = 0;

export const useNotification = () => {
    const addNotification = (message, type = 'info', timeout = 5000) => {
        const id = ++notificationId;
        notifications.value.push({
            id,
            message,
            type,
            timestamp: Date.now()
        });

        if (timeout) {
            setTimeout(() => {
                removeNotification(id);
            }, timeout);
        }

        return id;
    };

    const removeNotification = (id) => {
        const index = notifications.value.findIndex(n => n.id === id);
        if (index !== -1) {
            notifications.value.splice(index, 1);
        }
    };

    const success = (message, timeout) => addNotification(message, 'success', timeout);
    const error = (message, timeout) => addNotification(message, 'error', timeout);
    const warning = (message, timeout) => addNotification(message, 'warning', timeout);
    const info = (message, timeout) => addNotification(message, 'info', timeout);

    return {
        notifications,
        success,
        error,
        warning,
        info,
        remove: removeNotification
    };
}; 