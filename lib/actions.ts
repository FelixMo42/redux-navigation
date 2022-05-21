import { NavigationAction } from "./types"

export function goto(path: string): NavigationAction {
    return {
        type: "NAVIGATE_GOTO",
        path,
    }
}