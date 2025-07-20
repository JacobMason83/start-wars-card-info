import axios from "axios";
import { PersonProperties, PlanetProperties, SWAPIResponse } from "./Types";
export async function fetchData<T>(url: string): Promise<SWAPIResponse<T>> {
  try {
    const response = await axios.get<SWAPIResponse<T>>(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export async function fetchSpecificPeopleData(
  url: string
): Promise<PersonProperties> {
  try {
    const response = await axios.get(url);
    return response.data.result.properties;
  } catch (error) {
    console.error("Error fetching specific data:", error);
    throw error;
  }
}
export async function getPlanetData(
  url: string
): Promise<
  Pick<PlanetProperties, "name" | "terrain" | "population" | "climate" | "url">
> {
  if (url === "") {
    return {
      name: "",
      terrain: "",
      population: "",
      climate: "",
      url: "",
    };
  }
  try {
    const response = await axios.get(url);

    const planetData: PlanetProperties = response.data.result.properties;
    return {
      name: planetData.name,
      terrain: planetData.terrain,
      population: planetData.population,
      climate: planetData.climate,
      url: planetData.url,
    };
  } catch (error) {
    console.error("Error fetching planet name:", error);
    throw error;
  }
}
export async function getFilms(
  url: any
): Promise<{ title: string; uid: any }[]> {
  try {
    const response = await axios.get("https://www.swapi.tech/api/films/");
    const filmsData = await response.data.result;

    const charactersFilms = filmsData
      .filter((film: any) => film.properties.characters.includes(url))
      .map((film: any) => ({
        title: film.properties.title,
        uid: film.properties.uid,
      }));
    return charactersFilms;
  } catch (error) {
    console.error("Error fetching films:", error);
    throw error;
  }
}
