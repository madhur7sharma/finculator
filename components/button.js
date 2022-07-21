export default function Button(props) {
    return (
        <button className="px-4 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded hover:bg-gray-600 focus:outline-none" {...props}>
            {props.children}
        </button>
    );
}
