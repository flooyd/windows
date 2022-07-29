let ghpages = require("gh-pages");

ghpages.publish(
  "public", // path to public directory
  {
    branch: "gh-pages",
    repo: "https://github.com/flooyd/windows.git", // Update to point to your repository
    user: {
      name: "Floyd Jones", // update to use your name
      email: "floydtjones@gmail.com", // Update to use your email
    },
  },
  () => {
    console.log("Deploy Complete!");
  }
);
