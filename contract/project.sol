// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract LearningPathway {
    struct Progress {
        string courseName;
        string progressDescription;
        uint256 completionPercentage;
    }

    mapping(uint256 => Progress) public progressRecords;
    mapping(uint256 => address) public nftOwners;
    uint256 public nextTokenId;

    event NFTMinted(address indexed owner, uint256 indexed tokenId);
    event ProgressUpdated(uint256 indexed tokenId, string progressDescription, uint256 completionPercentage);

    function mintNFT(address to, string memory courseName, string memory progressDescription, uint256 completionPercentage) public {
        uint256 tokenId = nextTokenId;
        nftOwners[tokenId] = to;
        progressRecords[tokenId] = Progress(courseName, progressDescription, completionPercentage);
        nextTokenId++;

        emit NFTMinted(to, tokenId);
    }

    function updateProgress(uint256 tokenId, string memory progressDescription, uint256 completionPercentage) public {
        require(nftOwners[tokenId] == msg.sender, "You are not the owner of this NFT.");
        progressRecords[tokenId].progressDescription = progressDescription;
        progressRecords[tokenId].completionPercentage = completionPercentage;

        emit ProgressUpdated(tokenId, progressDescription, completionPercentage);
    }

    function getProgress(uint256 tokenId) public view returns (string memory, string memory, uint256) {
        Progress memory progress = progressRecords[tokenId];
        return (progress.courseName, progress.progressDescription, progress.completionPercentage);
    }

    function getOwner(uint256 tokenId) public view returns (address) {
        return nftOwners[tokenId];
    }
}
