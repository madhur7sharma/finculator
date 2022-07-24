export default function Button(props) {
    const { className, ...others } = props;
    return (
        <button className={`px-4 py-2 leading-5 text-white transition-colors duration-200 transform rounded focus:outline-none ${className}`} {...others}>
            {props.children}
        </button>
    );
}
