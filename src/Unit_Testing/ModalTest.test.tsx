import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { PersonModal } from "../Components/PersonModal";
import userEvent from "@testing-library/user-event";
import * as fetchModule from "../Utils/FetchStarWarsData";

// Mock the fetch functions
jest.mock("../Utils/FetchStarWarsData");

const mockPersonData = {
  name: "Luke Skywalker",
  gender: "male",
  birth_year: "19BBY",
  height: "172",
  mass: "77",
  hair_color: "blond",
  skin_color: "fair",
  eye_color: "blue",
  homeworld: "https://swapi.dev/api/planets/1/",
  url: "https://swapi.dev/api/people/1/"
};

const mockPlanetData = {
  name: "Tatooine",
  population: "200000",
  climate: "arid",
  terrain: "desert"
};

const mockMovies = [
  { title: "A New Hope", uid: "1" },
  { title: "The Empire Strikes Back", uid: "2" }
];

describe("PersonModal", () => {
  const onClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (fetchModule.fetchSpecificPeopleData as jest.Mock).mockResolvedValue(mockPersonData);
    (fetchModule.getPlanetData as jest.Mock).mockResolvedValue(mockPlanetData);
    (fetchModule.getFilms as jest.Mock).mockResolvedValue(mockMovies);
  });

  it("renders modal with correct data", async () => {
    render(<PersonModal open={true} onClose={onClose} person="https://swapi.tech/api/people/1/" />);

    // Wait for content to be loaded
    await waitFor(() => {
      expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();
    });

    // Check person attributes
    expect(screen.getByText(/Gender:/)).toHaveTextContent("male");
    expect(screen.getByText(/Birth Year:/)).toHaveTextContent("19BBY");
    expect(screen.getByText(/Height:/)).toHaveTextContent("172cm");
    expect(screen.getByText(/Weight:/)).toHaveTextContent("77");
    expect(screen.getByText(/Hair Color:/)).toHaveTextContent("blond");

    // Planet info
    expect(screen.getByText(/Homeworld:/)).toBeInTheDocument();
    expect(screen.getByText(/Name:/)).toHaveTextContent("Tatooine");

    // Movies
    expect(screen.getByText("A New Hope")).toBeInTheDocument();
    expect(screen.getByText("The Empire Strikes Back")).toBeInTheDocument();
  });

  it("calls onClose when close button is clicked", async () => {
    render(<PersonModal open={true} onClose={onClose} person="https://swapi.tech/api/people/1/" />);

    await waitFor(() => {
      expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();
    });

    const closeButton = screen.getByRole("button", { name: /close/i });
    await userEvent.click(closeButton);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("renders nothing if no person is passed", () => {
    const { container } = render(<PersonModal open={true} onClose={onClose} person={null} />);
    expect(container).toBeEmptyDOMElement();
  });
});
