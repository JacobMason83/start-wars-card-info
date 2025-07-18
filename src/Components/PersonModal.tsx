import React from "react";
import { Modal,  Box, Typography, Button, ModalProps, BoxProps } from "@mui/material";
import { PersonProperties, Film, PlanetProperties} from "../Utils/Types" 
import { fetchSpecificPeopleData, getFilms, getPlanetData } from "../Utils/FetchStarWarsData";

//This extends the ModalProps to allow for additional props to be passed in
// It also allows for the person prop to be passed in, which is of type PersonProperties
export interface PersonModalProps extends Omit<ModalProps, "children"> {
  person: string | null;
  open: boolean;
  onClose: () => void;
}

export const PersonModal: React.FC<PersonModalProps> = (props) => {
  const { open, onClose, person } = props;
  const [personsData, setPersonsData] = React.useState<PersonProperties | null>(null);
  const [movies, setMovies] = React.useState<Film[]>([]);
  const [planets, setPlanets] = React.useState<PlanetProperties | null>(null);

  React.useEffect(() => {
    if (person == null) {
      setMovies([]);
      return;
    }
    if(person != null) {
    // fetches the person data based on the url passed in from the main page
    const fetchData = async () => {
      const personData = await fetchSpecificPeopleData(person);
   setPersonsData( personData as PersonProperties);
const planetData = await getPlanetData(personsData?.homeworld || ''); // This will fetch the planet data based on the homeworld URL
      await setPlanets(planetData);
//  //fetch the films based on the person's URL passed in from the main page
      const films = await getFilms(person); // This will fetch the films releated to the persons url
      await setMovies(films);
      
    };
    fetchData();
}
  }, [person, personsData?.homeworld, personsData?.url]);

  if (!person) return null;

  return (
    <Modal open={open} onClose={onClose}>
      <Box

        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          minWidth: 300,
          bgcolor: 'background.paper',
          boxShadow: 240,
          p: 4,
          borderRadius: 2,
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
         

        }}
        {...props as BoxProps} // Spread the rest of the props to allow for additional styling  
      >
        <Typography variant="h5" mb={2}>{personsData?.name}</Typography>
        <Typography mt={2}><b>Gender:</b> {personsData?.gender}</Typography>
        <Typography><b>Birth Year:</b> {personsData?.birth_year}</Typography>
        <Typography mt={2}><b>Height:</b> {personsData?.height}cm</Typography>
        <Typography><b>Weight:</b> {personsData?.mass}</Typography>
        <Typography><b>Hair Color:</b> {personsData?.hair_color}</Typography>
        <Typography mt={2}><b>Skin Color:</b> {personsData?.skin_color}cm</Typography>
        <Typography><b>Eye Color:</b> {personsData?.eye_color}</Typography>
        
        <Typography variant="subtitle1" gutterBottom>Homeworld:</Typography>
        <Typography><b>Name:</b> {planets?.name}</Typography>
        <Typography><b>Population:</b> {planets?.population}</Typography>
        <Typography><b>Climate:</b> {planets?.climate}</Typography>
        <Typography><b>Terrain:</b> {planets?.terrain}</Typography>
        <Typography mt={2} variant="subtitle1">Movies:</Typography>
        {movies.length > 0 ? (
          movies.map((movies?) => (
            <Box key={movies?.uid} mb={1} sx={{
}}>
              <Typography variant="body2"><b>{movies?.title}</b></Typography>
            </Box>
          ))
        ) : (
          <Typography variant="body2">No movies found.</Typography>
        )}
        <Box mt={3} display="flex" justifyContent="flex-end">
          <Button variant="contained" onClick={onClose}>Close</Button>
        </Box>
      </Box>
    </Modal>
  );
};