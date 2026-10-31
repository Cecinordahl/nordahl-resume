import { useEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

/**
 * BrowserRouter keeps the previous page's scroll position on navigation, so opening a note
 * from halfway down the list would land halfway down the note. This scrolls to the top when
 * a link opens a new page. Back/forward (POP) is left alone so the browser can return you to
 * where you were, and query-only changes (e.g. filters) don't jump because the path is unchanged.
 */
export default function ScrollToTop() {
    const { pathname } = useLocation();
    const navigationType = useNavigationType();

    useEffect(() => {
        if (navigationType !== "POP") window.scrollTo(0, 0);
    }, [pathname, navigationType]);

    return null;
}
