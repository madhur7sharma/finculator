export default function Input(props) {
    return (
        <input
            autoComplete="off"
            className="inputbox focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none 
    focus:ring focus:ring-blue-300"
            {...props}
        />
    );
}
