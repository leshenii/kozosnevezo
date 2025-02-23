import { HeroUIProvider } from '@heroui/react';
import {Suspense} from "react";

/**
 * Requiered HeroUIProvider for the HeroUI components
 * Next.js docs: Reading search parameters through useSearchParams() without a Suspense boundary will opt the entire page into client-side rendering. This could cause your page to be blank until the client-side JavaScript has loaded. I wrapped the children with Suspense to avoid this issue on all pages.
 * @param children
 * @returns {JSX.Element}
 * @constructor
 */
export function Providers({ children }) {
    return (
        <HeroUIProvider>
            <Suspense fallback={<div>Loading...</div>}>
                {children}
            </Suspense>
        </HeroUIProvider>
    );
}