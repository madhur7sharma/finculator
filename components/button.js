export default function Button(props) {
    return (
        <button className="custButton" {...props}>
            {props.children}
        </button>
    );
}
