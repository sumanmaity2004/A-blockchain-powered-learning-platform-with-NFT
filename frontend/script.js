const contractAddress = "YOUR_CONTRACT_ADDRESS";
const abi = [
    {
        "inputs": [
            { "internalType": "address", "name": "to", "type": "address" },
            { "internalType": "string", "name": "courseName", "type": "string" },
            { "internalType": "string", "name": "progressDescription", "type": "string" },
            { "internalType": "uint256", "name": "completionPercentage", "type": "uint256" }
        ],
        "name": "mintNFT",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "uint256", "name": "tokenId", "type": "uint256" },
            { "internalType": "string", "name": "progressDescription", "type": "string" },
            { "internalType": "uint256", "name": "completionPercentage", "type": "uint256" }
        ],
        "name": "updateProgress",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }],
        "name": "getProgress",
        "outputs": [
            { "internalType": "string", "name": "", "type": "string" },
            { "internalType": "string", "name": "", "type": "string" },
            { "internalType": "uint256", "name": "", "type": "uint256" }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

let contract;

async function init() {
    if (typeof window.ethereum !== 'undefined') {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        contract = new ethers.Contract(contractAddress, abi, signer);
        console.log("Connected to contract");
    } else {
        alert("Please install MetaMask!");
    }
}

async function mintNFT() {
    const to = document.getElementById("recipient").value;
    const courseName = document.getElementById("courseName").value;
    const progressDescription = document.getElementById("progressDescription").value;
    const completionPercentage = document.getElementById("completionPercentage").value;

    try {
        const tx = await contract.mintNFT(to, courseName, progressDescription, completionPercentage);
        await tx.wait();
        alert("NFT Minted Successfully!");
    } catch (err) {
        console.error(err);
        alert("Minting Failed!");
    }
}

async function updateProgress() {
    const tokenId = document.getElementById("tokenIdUpdate").value;
    const description = document.getElementById("updateDescription").value;
    const percentage = document.getElementById("updatePercentage").value;

    try {
        const tx = await contract.updateProgress(tokenId, description, percentage);
        await tx.wait();
        alert("Progress Updated Successfully!");
    } catch (err) {
        console.error(err);
        alert("Update Failed!");
    }
}

async function getProgress() {
    const tokenId = document.getElementById("tokenIdGet").value;

    try {
        const result = await contract.getProgress(tokenId);
        document.getElementById("progressResult").innerText = 
            `Course: ${result[0]} | Description: ${result[1]} | Completion: ${result[2]}%`;
    } catch (err) {
        console.error(err);
        alert("Failed to Fetch Progress!");
    }
}

window.onload = init;
