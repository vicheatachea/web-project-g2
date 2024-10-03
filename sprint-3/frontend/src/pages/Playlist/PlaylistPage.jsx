import React from "react";
import styles from "./PlaylistPage.module.css"; // Import the CSS module

const PlaylistPage = () => {
    return (
        <div className={styles.container}>
            {/* Playlist Header */}
            <div className={styles.header}>
                <div className={styles.imageWrapper}>
                    <img
                        className={styles.playlistImage}
                        src="https://via.placeholder.com/150"
                        alt="Playlist"
                    />
                </div>
                <div className={styles.headerText}>
                    <p className={styles.smallText}>PLAYLIST</p>
                    <h1 className={styles.title}>posty's playlist</h1>

                </div>
            </div>

            {/* Playlist Controls */}
            <div className={styles.controls}>
                <button className={styles.playButton}>Play</button>

            </div>

            {/* Playlist Tracks */}
            <table className={styles.table}>
                <thead>
                <tr>
                    <th className={styles.tableHeader}>#</th>
                    <th className={styles.tableHeader}>TITLE</th>
                    <th className={styles.tableHeader}>ALBUM</th>
                    <th className={styles.tableHeader}>DATE ADDED</th>
                    <th className={styles.tableHeader}>DURATION</th>
                </tr>
                </thead>
                <tbody>
                {tracks.map((track, index) => (
                    <tr key={index}>
                        <td className={styles.tableCell}>{index + 1}</td>
                        <td className={styles.tableCell}>
                            <span className={styles.trackTitle}>{track.title}</span> <br/>
                            <span className={styles.trackArtist}>{track.artist}</span>
                        </td>
                        <td className={styles.tableCell}>{track.album}</td>
                        <td className={styles.tableCell}>{track.dateAdded}</td>
                        <td className={styles.tableCell}>{track.duration}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

// Sample data
const tracks = [
    {
        title: "I DID IT (feat. Post Malone, Megan Thee Stallion, DaBaby)",
        artist: "DJ Khaled",
        album: "KHALED KHALED",
        dateAdded: "May 4, 2021",
        duration: "2:45",
    },
    {
        title: "Only Wanna Be With You - Pokémon 25 Version",
        artist: "Post Malone",
        album: "Only Wanna Be With You",
        dateAdded: "Feb 25, 2021",
        duration: "4:01",
    },
    {
        title: "Hollywood's Bleeding",
        artist: "Post Malone",
        album: "Hollywood's Bleeding",
        dateAdded: "Sep 6, 2019",
        duration: "2:36",
    },
    {
        title: "All the Smoke (feat. Gunna & Wiz Khalifa)",
        artist: "Tyla Yaweh",
        album: "All the Smoke",
        dateAdded: "Dec 22, 2020",
        duration: "3:31",
    },
];

export default PlaylistPage;
