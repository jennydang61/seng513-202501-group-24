// to use the navigate function from react


export let navigate = (path: string, state) => {}

export const setNavigate = (fn) => {
    navigate = fn;
}