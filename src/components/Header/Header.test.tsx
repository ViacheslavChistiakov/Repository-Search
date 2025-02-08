import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { expect, jest, test } from '@jest/globals';
import { Header } from "./Header";

test("Header calls onSearch when typing", async () => {
  const onSearchMock = jest.fn();
  render(<Header onSearch={onSearchMock} />);

  const  input = await screen.findByPlaceholderText("Enter your github username...");
  fireEvent.change(input, { target: { value: "newuser" } });

  expect(onSearchMock).toHaveBeenCalledWith("newuser");
});