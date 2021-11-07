

  const getAllCountriesfromApi = async (req, res) => {
    
  var req = axios.get("https://www.universal-tutorial.com/api/getaccesstoken");
  req.headers({
    "Accept": "application/json",
    "api-token": "PLW0lE-ml1A2hdId9vwBfiJa8IXESG5ieeGEMv8VAZsXUEe0AwnZVZnVDG16hFzS0tA",
    "user-email": "pereyrapame@gmail.com"
  });
  req.end(function (res) {
    if (res.error) throw new Error(res.error);
    console.log(res.body);
  });
}

getAllCountriesfromApi()

module.exports = {
  getAllCountriesfromApi
};
