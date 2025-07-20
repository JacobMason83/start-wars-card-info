import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid'
import {
  Card,
  CardContent,
  Typography,
  TextField,
  CardMedia,
    Button,
  Box
} from '@mui/material'
import { fetchData } from '../Utils/FetchStarWarsData'
import { SWAPIResponse } from '../Utils/Types'
import { PersonModal } from './PersonModal'

export const MainPage: React.FC = () => {
  const [search, setSearch] = useState('')
  const [data, setData] = useState<SWAPIResponse<any> | null>(null)
  const [nextUrl, setNextUrl] = useState<string | null>(null)
  const [prevUrl, setPrevUrl] = useState<string | null>(null)
  const [itemUrl, setItemUrl] = useState<string | null>(null)
  const [totalPages,setTotalPages] = useState<number | null>(null)

  const [url, setUrl] = useState('https://www.swapi.tech/api/people/')  
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    
    const fetchSwapiData = async () => {

      const swapiData = await fetchData<SWAPIResponse<any>>(url)
      setData(swapiData)
        setNextUrl(swapiData.next || nextUrl)
        setPrevUrl(swapiData.previous || prevUrl)
        setTotalPages(swapiData.total_pages || totalPages)

      console.log('This is swapi data', swapiData)
      console.log('This is nextUrl', nextUrl)
      console.log("this is the prevUrl", prevUrl)
    }
    fetchSwapiData()
} 
,[nextUrl, prevUrl, totalPages, url])
  console.log('This is data', data?.results)
  const handleNext = () => {
      // When handleNext is called, nextUrl will be updated and useEffect will re-fetch
       setUrl(nextUrl || url)
  }
  const handlePrev = () => {
      // When handlePrev is called, prevUrl will be updated and useEffect will re-fetch
      setUrl(prevUrl || url)
  } 
  const filteredData = data != null ? data.results.filter((item) => {
      const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
      return matchesSearch;
  }) : [];
  // now i need to create a card for each item clicked on, and make it a pop up model
  return (
    <Box p={12} sx={{ backgroundColor: '#DFE4EBFF' }}>
      <Box display='flex' gap={2} mb={3}>
        <TextField
          label='Filter'
          variant='outlined'
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

      </Box>
      <Grid container spacing={6} gap={3} >
        {filteredData.map( item => (
        <Grid size={2.4} >
          <Card key={item.uid} 
                        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.05)";  
            e.currentTarget.style.boxShadow = "0px 4px 20px rgba(0, 0, 0, 1.2)";
            
        }
        }
        onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "none";
            }
        }
            sx={{ maxWidth: 345, margin: 'auto', cursor: 'pointer' }}
            >
            <CardMedia
              component='img'
              height='140'
              image={'https://random.imagecdn.app/v1/image?width=500&height=150'} // fallback if no image
              alt={item.name}
                sx={{ objectFit: 'cover' }} // Ensures the image covers the card area
  
            />
            <CardContent>
              <Typography variant='h6'>{item.name}</Typography>

              <Typography variant='body2'
                            onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.05)";  
            e.currentTarget.style.boxShadow = "0px 4px 20px rgba(0, 0, 0, 0.2)";
            e.currentTarget.style.backgroundColor = "lightblue";
            
        }
        }
        onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "none";
            e.currentTarget.style.backgroundColor = 'background.paper';
            }
        }onClick={() => {
              setItemUrl(item.url);
              setOpenModal(true);
            }}>LearnMore</Typography>
            </CardContent>
          </Card>
          </Grid>
        ))}
      </Grid>
            <Box display="flex" justifyContent="center" alignItems="center" mt={2} gap={2}>
        <Button
        sx={{marginTop:'1rem'}}
          variant="contained"
          onClick={ () => {handlePrev()} }
          disabled={prevUrl == null || prevUrl === 'https://www.swapi.tech/api/people/1' || (prevUrl === 'https://www.swapi.tech/api/people?page=1&limit=10' && nextUrl === 'https://www.swapi.tech/api/people?page=2&limit=10')}
        >
          Previous
        </Button>
        <Button
         sx={{marginTop:'1rem'}}
          variant="contained"
          onClick={() =>{handleNext()} }
          disabled={nextUrl === null || nextUrl === url ?nextUrl === `https://www.swapi.tech/api/people?page=${totalPages}&limit=10` : false}
        >
          Next
        </Button>
      </Box>
                <PersonModal
                person={itemUrl}
                open={openModal}
                onClose={() => {setOpenModal(false)}}
                />
    </Box>
  )
}
