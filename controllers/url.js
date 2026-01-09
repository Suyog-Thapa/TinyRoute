const shortid = require("shortid");
const URL = require("../models/urls");

async function handleGenerateNewShortURL(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "URL is required" });
  const shortId = shortid.generate();  
  
  await URL.create({
    shortId: shortId,
    redirectURL: body.url,
    visitHistory: [],
    createdBy: req.user._id
  });
  
  
  const allurls = await URL.find({ createdBy: req.user._id });
  return res.render("home", {
    id: shortId,
    urls: allurls
  });
}

async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });

  if (!result) return res.status(404).json({ error: "Not found" });

  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory
  });
}


module.exports={
    handleGenerateNewShortURL,handleGetAnalytics
}