const fs = require('fs');
const path = require('path');

// Usage: node ./m3u-generator.js {path-to-rom-folder} [apply]

const folderPath = process.argv[2];
const apply = process.argv[3] === "apply";

// Get all files in directory with Disc pattern
const files = fs.readdirSync(folderPath).filter(file => / \(Disc (\d)*\)/.test(file));

// Group files by rom name
const groupedRoms = {};
files.forEach(file => {

    const romName = file
        .split(".")[0]
        .replace(/ \(Disc (\d)*\)/, '');

    if (!groupedRoms[romName]) {
        groupedRoms[romName] = [file];
        return;
    }

    groupedRoms[romName].push(file);
    groupedRoms[romName].sort();
});

console.log(`Detected ${Object.keys(groupedRoms).length} M3U playlists for ${files.length} files.`);
console.log();
console.log("M3U Playlists:");
console.log();

// Print out all detected playlists/groups
Object.entries(groupedRoms).forEach(([romName, fileNames]) => {
    console.log(romName);
    fileNames.forEach(fileName => {
        console.log('\t', fileName);
    });
});

console.log();

if (apply) {
    // Create M3U folders
    // Move files to created folder
    // Create M3U playlist files
    Object.entries(groupedRoms).map(([romName, files]) => {

        const m3uName = `${romName}.m3u`;

        const romFolderPath = path.join(folderPath, m3uName)

        fs.mkdirSync(romFolderPath);

        fs.writeFileSync(path.join(romFolderPath, m3uName), files.join('\n'));

        files.forEach(file => {
            const oldFilePath = path.join(folderPath, file);
            const newFilePath = path.join(romFolderPath, file);

            fs.renameSync(oldFilePath, newFilePath);
        });
    });
    console.log(`Generated ${Object.keys(groupedRoms).length} M3U playlists`)
} else {
    console.log("No M3U plalists were generated.");
    console.log('Use "apply" to apply the playlist generation');
}

console.log()



