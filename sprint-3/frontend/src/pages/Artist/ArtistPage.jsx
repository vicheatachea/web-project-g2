import React, {useEffect, useState} from 'react';
import styles from './ArtistPage.module.css';
import accountPicture from '../../images/the-rock.jpg';

// version for using mock data mimicking the JSON response from Spotify API
const mockArtistData = {
    external_urls: {
        spotify: "https://open.spotify.com/artist/12345"
    },
    followers: {
        href: null,
        total: 50000
    },
    genres: ["Prog rock", "Grunge"],
    href: "https://api.spotify.com/v1/artists/12345",
    id: "12345",
    images: [
        {
            url: accountPicture,
            height: 300,
            width: 300
        }
    ],
    name: "Mock Artist",
    popularity: 85,
    type: "artist",
    uri: "spotify:artist:12345"
};

const ArtistPage = () => {
    const [artist, setArtist] = useState(null);

    // Simulate fetching artist data using mock data
    useEffect(() => {
        const fetchArtist = () => {
            // Simulating an API call by setting mock data
            setTimeout(() => {
                setArtist(mockArtistData);
            }, 1000); // Adding a delay to simulate async behavior
        };
        fetchArtist();
    }, []);

    if (!artist) {
        return <div>Loading...</div>;
    }

    return (
        <section className={`${styles.artistPage}`}>
            <h1>{artist.name}</h1>
            <img
                src={artist.images[0].url}
                alt={artist.name}
                height={artist.images[0].height}
                width={artist.images[0].width}
            />
            <p>Genres: {artist.genres.join(', ')}</p>
            <p>Followers: {artist.followers.total.toLocaleString()}</p>
            <p>Popularity: {artist.popularity}</p>
        </section>
    );
};

export default ArtistPage;


/* real version using spotify API call

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './ArtistPage.module.css'; 

const ArtistPage = () => {
  const [artist, setArtist] = useState(null);

  // Replace with your actual API call logic
  const fetchArtist = async () => {
    try {
      const response = await axios.get('/path-to-your-spotify-api-endpoint');
      setArtist(response.data);
    } catch (error) {
      console.error("Error fetching artist data:", error);
    }
  };

  useEffect(() => {
    fetchArtist();
  }, []);

  if (!artist) {
    return <div>Loading...</div>;
  }

  return (
    <div className={`${styles.artistPage} ${theme}`}>
      <h1>{artist.name}</h1>
      <img
        src={artist.images[0].url}
        alt={artist.name}
        height={artist.images[0].height}
        width={artist.images[0].width}
      />
      <p>Genres: {artist.genres.join(', ')}</p>
      <p>Followers: {artist.followers.total}</p>
      <p>Popularity: {artist.popularity}</p> 
    </div>
  );
};

export default ArtistPage;
 */ 