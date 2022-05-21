import { joinPaths, screenMatchesPath } from '../lib/utils'

test("joinPaths", () => {
    const rootPath = "a/b/c".split('/');

    function joinPathsUtil(b: string): string {
        return joinPaths(rootPath, b.split('/')).join('/');
    }

    expect(joinPathsUtil('d/e')).toBe('a/b/c/d/e'); 
    expect(joinPathsUtil('./d/e')).toBe('a/b/c/d/e'); 
    expect(joinPathsUtil('./../d/e')).toBe('a/b/d/e'); 
    expect(joinPathsUtil('../d/e')).toBe('a/b/d/e'); 
    expect(joinPathsUtil('../../d/e')).toBe('a/d/e'); 
    expect(joinPathsUtil('..')).toBe('a/b'); 
    expect(joinPathsUtil('/d/e')).toBe('d/e'); 
    expect(joinPathsUtil('')).toBe('a/b/c'); 
})

test("screenMatchesPath", () => {
    function screenMatchesPathUtil(a: string, b: string): boolean {
        return screenMatchesPath(a.split('/'), b.split('/'));
    }

    expect(screenMatchesPathUtil("a", "a")).toBe(true);
    expect(screenMatchesPathUtil("a", "b")).toBe(false);
    expect(screenMatchesPathUtil("a/b", "a")).toBe(false);
    expect(screenMatchesPathUtil("a/:b", "a")).toBe(false);
    expect(screenMatchesPathUtil(":a/b", "a")).toBe(false);
    expect(screenMatchesPathUtil(":a/b", "a/a")).toBe(false);
    expect(screenMatchesPathUtil(":a", "b")).toBe(true);
    expect(screenMatchesPathUtil("post/:id", "post/1234/comments")).toBe(true);
})