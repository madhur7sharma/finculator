import Link from "next/link";
export default function CustLink(props) {
    return (
        <Link {...props}>
            <a style={props.style} className={`custLink dark:text-white`}>
                {props.children}
            </a>
        </Link>
    );
}
