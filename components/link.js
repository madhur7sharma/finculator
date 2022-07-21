import Link from "next/link";
export default function CustLink(props) {
    return (
        <Link {...props}>
            <a style={props.style} className={props.className ? props.className : "custLink"}>
                {props.children}
            </a>
        </Link>
    );
}
