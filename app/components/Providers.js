import { HeroUIProvider } from '@heroui/react';
import {Suspense} from "react";

export function Providers({ children }) {
    return (
        <HeroUIProvider>
            <Suspense fallback={<div>Loading...</div>}>

                {children}
            </Suspense>
        </HeroUIProvider>
    );
}