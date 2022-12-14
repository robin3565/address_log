import { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import axios from "axios";

function App() {
  const [address, setAddress] = useState("");
  const [res, setRes] = useState({});
  const fetchApi = async (path) => {
    await axios
      .get(`http://localhost:8080/notify?address=${path}`)
      .then((res) => {
        if (res.data.result === "OK") {
          setRes(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    // fetchApi();
  }, []);

  return (
    <main className="container">
      <div className="app">
        <div className="header">
          <IoIosArrowBack />
          <span>코인 보내기</span>
        </div>
        <div className="coinInfo"></div>
        <div className="sendTo">
          <p>To.</p>
          <input
            type="text"
            onChange={(e) => setAddress(e.target.value)}
            onKeyUp={() => fetchApi(address)}
          />
          <p>
            {res?.safe_cnt && res?.danger_cnt ? (
              <span>
                해당 지갑주소에 대한 안전 정보 {res?.safe_cnt}건과 위험 정보{" "}
                {res?.danger_cnt}건이 등록되어 있습니다.
              </span>
            ) : res?.danger_cnt ? (
              <span>
                해당 지갑주소에 대한 위험 정보가 {res?.danger_cnt}건 등록되어
                있습니다.
              </span>
            ) : res?.safe_cnt ? (
              <span>
                해당 지갑주소에 대한 안전 정보가 {res?.safe_cnt}건 등록되어
                있습니다.
              </span>
            ) : (
              ""
            )}
          </p>
        </div>
      </div>
    </main>
  );
}

export default App;
