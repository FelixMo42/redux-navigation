import { ReactNode, ReactElement } from 'react';

import { ScreenProps } from "./types"

/**
 * Any random child could be passing into the navigators, but we want a list of screens.
 */
export function normalizeChildren(children: ReactNode): ReactElement<ScreenProps>[] {
    // STEP 1: Make sure the children are really an array.
    const arrayOfChildren = Array.isArray(children) ? children : [children];

    // STEP 2: Make sure that all the children are screens.
    return arrayOfChildren.filter((child) => typeof child === 'object' && 'props' in child);
}

/**
 * Checks if a segment of an path is a wild card (IE: start with ':').
 */
export function isWildCard(part: string): boolean {
    return part[0] === ':'
}

/**
 * Checks if the current path starts with the screen path.
 */
export function screenMatchesPath(screenPath: string[], currentPath: string[]): boolean {
    // If there are more elemts in the screen path then the path were matching against, then they
    // can't match.
    if (screenPath.length > currentPath.length) return false;

    // Each of the elemts in the screen path have to be a wild card, or equal too the current path.
    for (let i = 0; i < screenPath.length; i++) {
        if (!isWildCard(screenPath[i]) && screenPath[i] !== currentPath[i]) {
            return false;
        }
    }

    // They match!
    return true;
}

/**
 * 
 */
export function joinPaths(a: string[], b: string[]): string[] {
    //
    if ((b[0] == '' && b.length == 1) || b.length == 0) return a

    //
    if (b[0] === '') return b.slice(1)

    //
    if (b[0] === '.') return joinPaths(a, b.slice(1));

    //
    if (b[0] === '..') return joinPaths(a.slice(0, -1), b.slice(1));

    // 
    return [...a, ...b];
}