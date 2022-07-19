import Link from "next/link";
export default function CustLink(props) {
    return (
        <Link {...props}>
            <a className="custLink">{props.children}</a>
        </Link>
    );
}
