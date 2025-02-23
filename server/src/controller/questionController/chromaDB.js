require("dotenv").config();
const axios = require("axios");
const { pipeline } = require("@xenova/transformers");

const CHROMA_DB_URL = "http://localhost:8000/api/v1";

let embedder;
async function loadModel() {
    embedder = await pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2");
}

function generateCollectionName(email) {
    return email.replace(/[@.]/g, "_");
}

async function collectionExists(collectionName) {
    try {
        const response = await axios.get(`${CHROMA_DB_URL}/collections`);
        return response.data.collections.some(col => col.name === collectionName);
    } catch (error) {
        console.error("❌ Error checking collection existence:", error.response?.data || error);
        return false;
    }
}


async function createCollection(email) {
    const collectionName = generateCollectionName(email);

    try {
        if (await collectionExists(collectionName)) {
            console.log(`⚠️ Collection already exists: ${collectionName}`);
            return;
        }

        await axios.post(`${CHROMA_DB_URL}/collections`, { name: collectionName });
        console.log(`✅ Collection created for user: ${email} (${collectionName})`);
    } catch (error) {
        console.error("❌ Error creating collection:", error.response?.data || error);
    }
}

async function getEmbedding(text) {
    if (!embedder) await loadModel();
    const embedding = await embedder(text, { pooling: "mean", normalize: true });
    return Array.from(embedding.data);
}

async function addQuestion(email, question, answer, topicIndex) {
    const collectionName = generateCollectionName(email);
    console.log(question)
    try {
        const embedding = await getEmbedding(question);
        if (!embedding) return;

        await axios.post(`${CHROMA_DB_URL}/collections/${collectionName}/upsert`, {
            embeddings: [embedding],
            metadatas: [{
                question: question,
                answer: answer,
                topicIndex: topicIndex,
            }],
        });

        console.log(`✅ Question added to ${collectionName}:`, question);
    } catch (error) {
        console.error("❌ Error adding question:", error.response?.data || error);
    }
}

async function getQuestions(email, topicIndex) {
    const collectionName = generateCollectionName(email);

    try {
        const response = await axios.post(`${CHROMA_DB_URL}/collections/${collectionName}/get`, {
            where: {
                topicIndex: topicIndex, // Filter by topicIndex
            },
        });

        console.log(`🔍 Found ${response.data.metadatas.length} questions for topicIndex ${topicIndex}`);
        return response.data.metadatas; // Return question list
    } catch (error) {
        console.error("❌ Error retrieving questions:", error.response?.data || error);
    }
}

module.exports = {
    createCollection,
    addQuestion,
    getQuestions,
};