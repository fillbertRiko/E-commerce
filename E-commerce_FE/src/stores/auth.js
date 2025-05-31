import { defineStore } from 'pinia';

export const useAuthStore = defineStore('authStore', {
    state:() => {
        return{
            user: "Huy",
            //token: null,
            //isAuthenticated: false
        };
    },
    actions: {
        async authenticate(apiRoute, formData){
            try{
            const res  = await fetch(`/api/${apiRoute}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            console.log("phan hoi tu serve",data);
            } catch (error) {
            console.error('Error:', error);
            }
        }
    }
})