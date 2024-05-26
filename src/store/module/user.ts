import { defineStore } from 'pinia';

interface IUserState {
    name: string;
    age: number;
}

export const useUserStore = defineStore('user', {
    state: (): IUserState => {
        return {
            name: '张三',
            age: 18,
        };
    },
    getters: {
        getAge: (state) => {
            return state.age;
        },
    },
    actions: {
        setAge(age: number) {
            this.age = age;
        },
    },
});
