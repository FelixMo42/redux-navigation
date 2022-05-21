import { Path, NavigationAction } from './types'
import { joinPaths } from './utils'

export const initalState: Path = {
    path: [],
};

export function navigationReducer(state: Path = initalState, action: NavigationAction): Path {
    if (action.type === 'NAVIGATE_GOTO') {
        return {
            path: joinPaths(state.path, action.path.split('/')),
        };
    } else {
        return state;
    }
}