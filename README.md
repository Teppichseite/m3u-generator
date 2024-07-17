# m3u-generator
Script which generates M3U playlists for ROMs. Works usually for disc based systems like PlayStation 1, PlayStation 2, Sega Saturn or Dreamcast.

The generated result is compatible with the [ES-DE M3U playlist file format](https://gitlab.com/es-de/emulationstation-de/-/blob/master/USERGUIDE.md?ref_type=heads#multiple-game-files-installation).

## Setup
1. Install latest version of [Node.js and NPM](https://nodejs.org/en/download/package-manager)
2. Clone this repository or download as ZIP file and unzip it

## Usage
1. Navigate with the terminal inside this project root folder
2. Run `npm run generate -- {Path to your rom folders} [apply]`

## Example usage
1. Your folder structure might look like this
```
.
└── game-folder/
    ├── Game A (Disc 1).chd
    ├── Game A (Disc 2).chd
    ├── Game B (Disc 1).chd
    ├── Game B (Disc 2).chd
    ├── Game B (Disc 3).chd
    └── Game C.chd
```
2. Then you can run `npm run generate -- ./game-folder`
3. This will not apply any changes but will give you this output which you can use to double check the playlist groupings
```
Detected 2 M3U playlists for 5 files.

M3U Playlists:

Game A
         Game A (Disc 1).chd
         Game A (Disc 2).chd

Game B
         Game B (Disc 1).chd
         Game B (Disc 2).chd
         Game B (Disc 3).chd

Generated 2 M3U playlists.
```
4. If everything is correct you can apply the changes with `npm run generate -- ./game-folder apply`
5. Your new folder will look like this
```
.
└── game-folder/
    ├── Game A.m3u/
    │   ├── Game A (Disc 1).chd
    │   ├── Game A (Disc 2).chd
    │   └── Game A.m3u
    ├── Game B.m3u/
    │   ├── Game B (Disc 1).chd
    │   ├── Game B (Disc 2).chd
    │   ├── Game B (Disc 3).chd
    │   └── Game B.m3u
    └── Game C.chd
```
6. The *.m3u files which are not folders are the actual playlist files
7. Example m3u file for Game A
```
Game A (Disc 1).chd
Game A (Disc 2).chd
```


