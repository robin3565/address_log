const express = require("express");
const router = express.Router();
const commom = require("../util/commom");
const mysql = require("../mysql");

router.get("/address_api", async (req, res) => {
  const { address } = req.query;

  let resData = {
    result: "OK",
    err_msg: "",
    data: null,
  };

  let query = "";

  query =  " SELECT *" 
        + "   FROM address_log " 
        + "  WHERE address =  '" + commom.addslashes(commom.toValue(address)) + "' "
        ;

   const [contents] = await mysql.query(query);
   resData.data = contents;

   return res.json(resData);
});

module.exports = router;
