import axios from "axios";
import { useForm } from "react-hook-form";
import { AiFillQuestionCircle, AiFillExclamationCircle } from "react-icons/ai";

const Notify = () => {
  const fetchApi = async (data) => {
    await axios
      .post("http://localhost:8080/notify", {
        options: data.options,
        address: data.address,
        main_net: data.main_net,
        options_contents: data.contents,
      })
      .then((res) => {
        if (res.data.result === "OK") {
          alert(`저장 되었습니다.`);
          console.log(res.data);
          window.location.reload();
        }
      });
  };

  const onSubmit = async (data) => {
    fetchApi(data);
  };

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isDirty, errors },
  } = useForm();

  return (
    <div className="notify">
      <div className="layoutfix">
        <div className="leftTitle">
          <h4>암호화폐 지갑주소 정보 등록</h4>
          <p>
            여러분의 진실된 목소리로 더욱 <em>안전</em>하고 <em>편리</em>한{" "}
            <br></br>
            화폐거래 시장을 만들어가겠습니다.
          </p>
        </div>
        <div className="content">
          <div className="subBox">
            <div className="subTitle">
              <b>암호화폐 정보 등록</b>
            </div>
            <ul>
              <li>
                <h6 className="sub-sub-Title">
                  암호화폐 종류 <em>*</em>
                </h6>
                <select name="" id="">
                  <option value="" defaultValue>
                    선택
                  </option>
                  <option name="BTC" value="BTC">
                    비트코인(BTC)
                  </option>
                  <option name="ETH" value="ETH">
                    이더리움(ETH)
                  </option>
                  <option name="BNB" value="BNB">
                    BNB(BNB)
                  </option>
                  <option name="XRP" value="XRP">
                    리플(XRP)
                  </option>
                  <option name="DOGE" value="DOGE">
                    도지 코인(DOGE)
                  </option>
                  <option name="ADA" value="ADA">
                    에이다(ADA)
                  </option>
                  <option name="MATIC" value="MATIC">
                    폴리곤(MATIC)
                  </option>
                  <option name="DOT" value="DOT">
                    폴카닷(DOT)
                  </option>
                  <option name="SOL" value="SOL">
                    솔라나(SOL)
                  </option>
                  <option name="etc" value="etc">
                    기타
                  </option>
                </select>
              </li>
              <li>
                <h6 className="sub-sub-Title">
                  암호화폐 지갑주소 <em>*</em>
                </h6>
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="예) 0fda7asfdsaf8asdfs89sdafsf8d9sqerw8"
                />
              </li>
            </ul>
          </div>
          <div className="subBox">
            <div className="subTitle">
              <b>암호화폐 안전 정보 등록</b>
              <AiFillQuestionCircle />
              <div className="comment">
                안전 정보를 통해 해당 지갑주소의 안전 정도를 파악하고 있어요!
              </div>
            </div>
            <div className="btnBox">
              <button className="clicked">
                <em>안전해요</em>
              </button>
              {/* 위험해요 클릭시 describe 에 active 클래스 추가*/}
              <button className="danger">
                <em>위험해요</em>
              </button>
            </div>
          </div>
          <div className="subBox">
            <div className="subTitle">
              <b>암호화폐 피해 내용</b>
              <p>
                <em>정확한 내용</em>을 바탕으로 작성해 주세요.
              </p>
            </div>
            <h6 className="sub-sub-Title">
              피해 종류 <em>*</em>
            </h6>
            <div className="btnBox">
              <button>거래 사기</button>
              <button>환정 사기</button>
              <button>보이스피싱</button>
              <button>로맨스 스캠</button>
              <button className="clicked">기타</button>
            </div>
            <div className="describe">
              <div className="alertBox">
                <AiFillExclamationCircle />
                <em>
                  피해 종류에 대해 <b>간략히</b> 서술해 주세요.
                </em>
              </div>
              <input type="text" name="" id="" placeholder="예) 무슨 사기" />
            </div>
          </div>
        </div>
        <div className="submitBox">
          <button type="submit" className="submitBtn">
            등록
          </button>
        </div>
      </div>
    </div>
  );
};

export default Notify;
