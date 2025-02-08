import { renderHook, act } from "@testing-library/react";
import { useDebounce } from "./useDebounce";
import { expect, jest, test } from '@jest/globals';

jest.useFakeTimers();

test("useDebounce delays updating value", () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 500), {
        initialProps: { value: "initial" },
    });

    expect(result.current).toBe("initial");

    rerender({ value: "updated" });

    act(() => {
        jest.advanceTimersByTime(300);
    })

    expect(result.current).toBe("initial");

    act(() => {
        jest.advanceTimersByTime(200);
    })

    expect(result.current).toBe("updated");
});




