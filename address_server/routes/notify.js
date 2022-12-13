const express = require("express");
const router = express.Router();
const commom = require("../util/commom");
const mysql = require("../mysql");

router.get("/notify", async (req, res) => {
    const { address } = req.query;

    let resData = {
      result: "OK",
      err_msg: "",
      data: null,
    };
  
    let query = "";

    query =  " SELECT *" 
          + "   FROM address_info " 
          + "  WHERE address =  '" + commom.addslashes(commom.toValue(address)) + "' "
          ;

    const [init] = await mysql.query(query);
    resData.init = init;

    query =  " SELECT *"
          +  "   FROM address_info "
          +  " INNER JOIN address_log "
          +  "     ON address_info.address_uid = address_log.address_uid "
          +  " WHERE address_log.address  = '" + commom.addslashes(commom.toValue(address)) + "' "
    const [contents] = await mysql.query(query);
    resData.total_cnt = contents.length;

    // 안전 vs 위험
    let safe_cnt = 0;
    let danger_cnt = 0;
    for(let i = 0; i < contents.length; i++) {
        if(contents[i].options == 0) {
            safe_cnt++;
        } else {
            danger_cnt++;
        }
    }

    resData.data = contents;
    resData.safe_cnt = safe_cnt;
    resData.danger_cnt = danger_cnt;
    
    if (contents.length == 0) {
      resData.result = "NG";
      resData.err_msg = "잘못된 정보입니다.";
    }
  
    return res.json(resData);
});

router.post("/notify", async (req, res) => {
    let resData = {
        result: "OK",
        err_msg: "",
        data: null,
    };

    let { options, address, main_net, option_contents } = req.body;
    if(!options) {
        options = 0;
    }


    let query = "";
    query = " SELECT *" 
          + "   FROM address_info "
          + "  WHERE main_net = '" + commom.toValue(main_net) + "' " 
          + "    AND address = '" + commom.addslashes(commom.toValue(address)) + "' "
          ;

    const [cnt] = await mysql.query(query);
    
    // address_info 가 없는 경우 insert
    // address_info 가 있는 경우 address_uid 저장  
    let address_uid = "";
    let blockchain = "";
    let result = "";
    if(cnt.length == 0) {
        query = " INSERT INTO address_info SET "
              + "    main_net = '" + commom.toValue(main_net) + "', "
              + "     address = '" + commom.addslashes(commom.toValue(address)) + "' "
              ;
        
        await mysql.query(query);
        
        query = " SELECT *" 
          + "   FROM address_info "
          + "  WHERE main_net = '" + commom.toValue(main_net) + "' " 
          + "    AND address = '" + commom.addslashes(commom.toValue(address)) + "' "
          ;
          const [result] = await mysql.query(query);
          address_uid = result[0].address_uid;

    } else { 
        address_uid = cnt[0].address_uid;
        blockchain = cnt[0].main_net;

        result = "이미 저장된 지갑주소 입니다.";
    }
    
    query = "  INSERT INTO address_log SET "
            + "  reg_date = NOW(), "
            + "  reg_time = NOW(), "
            + "  address_uid      = '" + commom.toValue(address_uid) + "', "
            + "  address   = '" + commom.addslashes(commom.toValue(address)) + "', "
            + "  options      = '" + commom.toValue(String(options)) + "', "
            + "  option_contents = '" + commom.addslashes(commom.toValue(option_contents)) + "' "
            ;

    const [contents] = await mysql.query(query);
    resData.data = contents;

    if (contents.length == 0) {
        resData.result = "NG";
        resData.err_msg = "잘못된 정보입니다.";
    }

    return res.json(resData);
});

module.exports = router;
