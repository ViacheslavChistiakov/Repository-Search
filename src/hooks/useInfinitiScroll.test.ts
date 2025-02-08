import { renderHook } from "@testing-library/react";
import { useInfiniteScroll } from "./useInfinitiScroll";
import { expect, jest, test } from '@jest/globals';

test("useInfiniteScroll triggers onLoadMore when last element is visible", () => {
    const onLoadMore = jest.fn();
    const { result } = renderHook(() => useInfiniteScroll({ loading: false, hasMore: true, onLoadMore }));

    const observerCallback = result.current;

    observerCallback(document.createElement("li"));

    expect(onLoadMore).toHaveBeenCalledTimes(1);
});