export interface SWAPIResponse<T> {
    message: string;
    results: T[];
    next?: string | null;
    previous?: string | null;
    total_pages?: number;
}

export interface PersonProperties {
    uid: string;
    name: string;
    height: string;
    mass: string;
    hair_color: string;
    skin_color: string;
    eye_color: string;
    birth_year: string;
    gender: string;
    homeworld: string;
    created: string;
    edited: string;
    url: string;

}

export interface PlanetProperties {
    name: string;
    population: string;
    terrain: string;
    climate: string;
    url: string;
}

export interface Film {
  uid: string;
  title: string;
  // add other film fields as needed ie, director, and can go very expansive
}

