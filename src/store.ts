import {create} from 'zustand'

type PasswordState = {
    length: number;
    includeNumbers: boolean;
    includeSymbols: boolean;
    includeUpperCase: boolean;
    includeLowerCase: boolean;
    generatedPassword: string;
    setLength: (length: number) => void;
    toggleNumbers: () => void;
    toggleSymbols: () => void;
    toggleUppercase: () => void;
    toggleLowerCase: () => void;
    generatePassword: () => void;
}

const usePasswordStore = create<PasswordState>((set) => ({
    length: 12,
    includeNumbers: true,
    includeSymbols: false,
    includeUpperCase: true,
    includeLowerCase: true,
    generatedPassword: '',

    setLength: (length) => set({length}),
    toggleNumbers: () => set((state) => ({includeNumbers: !state.includeNumbers})),
    toggleSymbols: () => set((state) => ({includeSymbols: !state.includeSymbols})),
    toggleUppercase: () => set((state) => ({includeUpperCase: !state.includeUpperCase})),
    toggleLowerCase: () => set((state) => ({includeLowerCase: !state.includeLowerCase})),

    generatePassword: () => set((state) => {
        const numbers = '0123456789';
        const symbols = '!@#$%^&&*()_+{}[]';
        const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const lowercase = 'abcdefghijklmnopqrstuvwxyz';

        let characters = ''

        if(state.includeNumbers) characters += numbers
        if(state.includeSymbols) characters += symbols
        if(state.includeUpperCase) characters += uppercase
        if(state.includeLowerCase) characters += lowercase

        let password = ''
        
        for(let i = 0; i < state.length; i++) {
            password += characters[Math.floor(Math.random() * characters.length)]
        }

        return { generatedPassword: password};
    })
}))

export default usePasswordStore