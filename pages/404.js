import { useRouter } from "next/router";
import { useEffect } from "react";

export default function PageNotFoundError() {
    const router = useRouter()

    return (
        <>404 Not Found</>
    )
}