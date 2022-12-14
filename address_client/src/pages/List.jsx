import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { OPTIONS, MAIN_NET_OPTIONS } from "../utils/constants";

const List = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [address, setAddress] = useState(location?.search?.split("=")[1]);
  const [res, setRes] = useState([]);

  const fetchApi = async () => {
    await axios
      .get(`http://localhost:8080/notify?address=${address}`)
      .then((res) => {
        if (res.data.result === "OK") {
          setRes(res.data);
        }
      });
  };

  useEffect(() => {
    if (!address) {
      alert("잘못된 접근입니다.");

      navigate("/");
    } else {
      fetchApi();
    }
  }, []);

  console.log(res);

  return (
    <div className="list">
      <div className="layoutfix">
        <div className="leftTitle">
          <h4>검색된 암호화폐 지갑주소 정보</h4>
          <p>
            여러분의 진실된 목소리로 더욱 <em>안전</em>하고 <em>편리</em>한{" "}
            <br></br>
            화폐거래 시장을 만들어가겠습니다.
          </p>
        </div>
        <div className="subTitle">
          <b>암호화폐 지갑주소 정보</b>
        </div>
        <div className="inputBox">
          <p>{address}</p>
        </div>
        {res?.data?.length > 0 ? (
          <p>
            총 <em>{res?.total_cnt}번</em>의 정보 등록 내역이 있습니다.
          </p>
        ) : (
          <p>
            <em>등록된 내역이 없습니다.</em>
          </p>
        )}

        {res?.data?.length > 0 && (
          <div className="btnBox">
            <span>
              <em>안전해요</em>
              <em>{res?.safe_cnt}</em>
            </span>
            <span className="danger">
              <em>위험해요</em>
              <em>{res?.danger_cnt}</em>
            </span>
          </div>
        )}
        <div className="bottomLink">
          <em>해당 지갑주소 정보 등록을 하고 싶어요!</em>
          <Link to="/notify">정보 등록 바로가기</Link>
        </div>
        {res?.data?.length > 0 && res?.danger_cnt > 0 && (
          <table className="tg">
            <thead>
              <tr>
                <th className="tg-nrix">번호</th>
                <th className="tg-nrix">종류</th>
                <th className="tg-nrix">피해 분류</th>
                <th className="tg-nrix">등록일</th>
                <th class="tg-nrix">스캔</th>
              </tr>
            </thead>
            <tbody>
              {res?.data?.map((item, index) => {
                return (
                  parseInt(item.options) > 0 && (
                    <tr key={index}>
                      <td className="tg-nrix">{index + 1}</td>
                      <td className="tg-nrix">
                        {MAIN_NET_OPTIONS[parseInt(item.main_net)]?.main_net}
                      </td>
                      <td className="tg-cly1">
                        {parseInt(item.options) == 5
                          ? item.option_contents
                            ? item.option_contents
                            : "기타"
                          : OPTIONS[parseInt(item.options)]?.text}
                      </td>

                      <td className="tg-cly1">{item.reg_date.split("T")[0]}</td>
                      <td class="tg-nrix">
                        <a
                          target="_blank"
                          href={`${
                            MAIN_NET_OPTIONS[parseInt(item.main_net)]?.url
                          }${address}`}
                        >
                          보기
                        </a>
                      </td>
                    </tr>
                  )
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default List;
