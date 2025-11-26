import fetch from 'node-fetch';
import fs from 'fs/promises';
import path from 'path';

const GITHUB_USERNAME = 'Golgrax';
const STATS_FILE_PATH = 'public/stats.json';
const GH_TOKEN = process.env.GH_TOKEN;

const headers = {};
if (GH_TOKEN) {
    headers['Authorization'] = `token ${GH_TOKEN}`;
}

async function fetchGitHubStats() {
    try {
        const userRes = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, { headers });
        if (!userRes.ok) {
            throw new Error(`Failed to fetch user data: ${userRes.statusText}`);
        }
        const userData = await userRes.json();
        
        const starredRes = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/starred`, { headers });
        if (!starredRes.ok) {
            throw new Error(`Failed to fetch starred data: ${starredRes.statusText}`);
        }
        const starredData = await starredRes.json();
        const starred_count = starredData.length || 0;

        const score = (starred_count * 10) + (userData.followers * 20) + userData.public_repos;

        let calculatedGrade = "F";
        if (score > 2000) calculatedGrade = "S";
        else if (score > 1000) calculatedGrade = "A";
        else if (score > 500) calculatedGrade = "B+";
        else if (score > 400) calculatedGrade = "B";
        else if (score > 350) calculatedGrade = "B-";
        else if (score > 200) calculatedGrade = "C";
        else if (score > 100) calculatedGrade = "D";
        else if (score > 50) calculatedGrade = "E";
        
        const stats = {
            repoCount: userData.public_repos,
            grade: calculatedGrade,
            lastUpdated: new Date().toISOString(),
        };

        const publicDir = path.dirname(STATS_FILE_PATH);
        await fs.mkdir(publicDir, { recursive: true });
        await fs.writeFile(STATS_FILE_PATH, JSON.stringify(stats, null, 2));
        console.log(`Successfully updated stats in ${STATS_FILE_PATH}`);

    } catch (error) {
        console.error("Failed to fetch GitHub stats:", error);
        process.exit(1);
    }
}

fetchGitHubStats();
