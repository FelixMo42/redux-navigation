import { initalState, navigationReducer } from '../lib/reducer'
import { goto } from "../lib/actions.ts"
import { Path } from '../lib/types';

test("navigationReducer", () => {
    function makeState(path: string): Path {
        return  {
            path: path.split("/")
        }
    }

    expect(navigationReducer(undefined, { type: "UNRELATED" })).toBe(initalState);
    expect(navigationReducer(undefined, goto("a"))).toEqual(makeState("a"));
    expect(navigationReducer(initalState, goto("a")).path.join("/")).toBe("a");
    expect(navigationReducer(makeState("a"), goto("b")).path.join("/")).toBe("a/b");
    expect(navigationReducer(makeState("a"), goto("/b")).path.join("/")).toBe("b");
    expect(navigationReducer(makeState("a"), goto("../b")).path.join("/")).toBe("b");
    expect(navigationReducer(initalState, { type: "UNRELATED" })).toBe(initalState);
})