/**
 * 
 */
export interface ScreenProps {
    path: string;
}

/**
 * 
 */
export type NavigationAction = {
    type: 'NAVIGATE_GOTO';
    path: string;
};

/**
 * 
 */
export interface Path {
    path: string[];
}