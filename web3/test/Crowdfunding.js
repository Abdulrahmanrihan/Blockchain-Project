const { expect } = require("chai"); // Mocha-framework, chai-library
const { ethers } = require("hardhat");

describe("CrowdFunding", function () {
  let crowdFunding;
  let owner, user1, user2;

  beforeEach(async function () {
    [owner, user1, user2] = await ethers.getSigners();

    const CrowdFunding = await ethers.getContractFactory("CrowdFunding");
    crowdFunding = await CrowdFunding.deploy();
    await crowdFunding.deployed();
  });

  it("Should create a new campaign", async function () {
    const title = "Test Campaign";
    const description = "This is a test campaign.";
    const target = ethers.utils.parseEther("1000");
    const deadline = Math.floor(Date.now() / 1000) + 3600; // 1 hour from now
    const image = "https://example.com/image.jpg";

    await crowdFunding.createCampaign(title, description, target, deadline, image);

    const campaigns = await crowdFunding.getCampaigns();
    expect(campaigns.length).to.equal(1);
    expect(campaigns[0].title).to.equal(title);
    expect(campaigns[0].description).to.equal(description);
    expect(campaigns[0].target).to.equal(target);
    expect(campaigns[0].deadline).to.equal(deadline);
    expect(campaigns[0].image).to.equal(image);
  });

  it("Should not create a campaign with a past deadline", async function () {
    const title = "Test Campaign";
    const description = "This is a test campaign.";
    const target = ethers.utils.parseEther("1000");
    const deadline = Math.floor(Date.now() / 1000) - 3600; // 1 hour ago
    const image = "https://example.com/image.jpg";

    await expect(
      crowdFunding.createCampaign(title, description, target, deadline, image)
    ).to.be.revertedWith("The deadline should be a date in the future.");
  });

  it("Should donate to a campaign", async function () {
    const title = "Test Campaign";
    const description = "This is a test campaign.";
    const target = ethers.utils.parseEther("1000");
    const deadline = Math.floor(Date.now() / 1000) + 3600; // 1 hour from now
    const image = "https://example.com/image.jpg";

    await crowdFunding.createCampaign(title, description, target, deadline, image);

    const donationAmount = ethers.utils.parseEther("100");
    await crowdFunding.connect(user1).donateToCampaign(0, { value: donationAmount });

    const [donators, donations] = await crowdFunding.getDonators(0);
    expect(donators.length).to.equal(1);
    expect(donators[0]).to.equal(user1.address);
    expect(donations[0]).to.equal(donationAmount);

    const campaign = await crowdFunding.campaigns(0);
    expect(campaign.amountCollected).to.equal(donationAmount);
  });
});