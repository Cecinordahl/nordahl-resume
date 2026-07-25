import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App.tsx";

function renderAt(path: string) {
    return render(
        <MemoryRouter initialEntries={[path]}>
            <App />
        </MemoryRouter>,
    );
}

describe("App routing", () => {
    it("renders the home page at /", async () => {
        renderAt("/");
        expect(await screen.findByText("Cecilie Nordahl")).toBeInTheDocument();
    });

    it("renders work detail for a known slug", async () => {
        renderAt("/work/accenture");
        expect(await screen.findByText("Accenture")).toBeInTheDocument();
    });

    it("renders a note by slug", async () => {
        renderAt("/notes/camunda-workflows-in-practice");
        expect(await screen.findByText("Camunda workflows in practice")).toBeInTheDocument();
    });

    it("renders NotFound for an unknown top-level route", async () => {
        renderAt("/this-route-does-not-exist");
        expect(await screen.findByText("Page not found")).toBeInTheDocument();
    });

    it("renders an inline not-found for an unknown work slug", async () => {
        renderAt("/work/does-not-exist");
        expect(await screen.findByText(/doesn.t exist/)).toBeInTheDocument();
    });
});
