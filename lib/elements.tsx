import React, { ReactNode, ReactElement } from 'react';
import { useSelector } from 'react-redux';

import { normalizeChildren, screenMatchesPath, isWildCard } from "./utils";

// 
export const PathParamsContext = React.createContext<Record<string, string>>({});
export const RemaingPathContext = React.createContext<string[]>([]);

// 
export const PathParamsConsumer = PathParamsContext.Consumer;

/**
 * Does a basic render of the selected screen. 
 */
export function renderItems(children: ReactNode, currentPath: string[]): ReactElement {
    // We want to coerce what ever was passing into the navigator into the form we want.
    // It also splits the path, so that we don't have to do it mutliple times later.
    // TODO: Memoize this?
    const screens = normalizeChildren(children).map((child) => ({
        path: child.props.path.split('/'),
        view: child,
    }));

    // Get the FIRST screen inside the router that fits the path.
    const screen = screens.find(({ path }) => screenMatchesPath(path, currentPath));

    // If we didn't find a screen that matched the current path, display the first screen.
    // Since this didn't match we don't want to provide any react contexts.
    if (!screen) return screens[0].view

    // If the screen path include wild card matches (EX /:name_of_param/) we want to build an
    // object with all of them so that it can be used by the rendered screen.
    const params = {};
    for (let i = 0; i < screen.path.length; i++) {
        if (isWildCard(screen.path[i])) {
            params[screen.path[i].substring(1)] = currentPath[i];
        }
    }

    // Sub navigators work on whatever is left over from the match.
    // EX: /post/5735/comments matched with /post/:id should leave /comments for sub navigators.
    const slice = currentPath.slice(screen.path.length); 

    // All that left to do it provide the context that is needed for sub navigators, and
    // draw the screen!
    return (
        <PathParamsContext.Provider value={params}>
            <RemaingPathContext.Provider value={slice}>
                {screen.view}
            </RemaingPathContext.Provider>
        </PathParamsContext.Provider>
    );
}

/**
 * 
 */
export function RootNavigator({ children }: { children: ReactNode }): ReactElement {
    // 
    const currentPath: string[] = useSelector((state) => state.navigation.path);

    // 
    return renderItems(children, currentPath);
}

/**
 * 
 */
export function SubNavigator({ children }: { children: React.ReactNode }) {
    // The previous navigator (maybe the root navigator) will provide the left over portions of the
    // path that it didn't use. We need to match off of thoses.
    return (
        <RemaingPathContext.Consumer>
            {(currentPath) => renderItems(children, currentPath)}
        </RemaingPathContext.Consumer>
    );
}
