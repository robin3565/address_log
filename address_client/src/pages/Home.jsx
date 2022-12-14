import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const [address, setAddress] = useState("");
  const navigate = useNavigate();
  const handleSearch = () => {
    // 공백 제거
    const newAddress = address.replace(/ /g,"")

    // 유효성 검사 추가 필요
    if (newAddress.length > 12) {
      navigate(`/list?add=${newAddress}`);
    } else {
        alert("정확한 지갑 주소를 입력해주세요.")
    }
  };

  return (
    <section>
      <div className="mainTitle">
        <h5>보다 안전한 암호화폐 거래</h5>
        <p>암호화폐 지갑주소 검색</p>
        <div className="inputBox">
          <input type="text" name="" id="" placeholder="검색할 계좌 주소를 입력해 주세요." onChange={(e) => setAddress(e.target.value)}/>
          <button onClick={handleSearch}>
            <img src="img/searchIcon.png" alt="" />
          </button>
        </div>
        <div className="bottomLink">
          <em>지갑주소 정보 등록을 하고 싶어요!</em>
          <Link to="/notify">정보 등록 바로가기</Link>
        </div>
      </div>
    </section>
  );
};

export default Home;
